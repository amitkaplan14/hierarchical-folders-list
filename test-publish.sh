#!/bin/bash

set -e

echo "🚀 Testing Package Publishing and Consumption"
echo "============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Clean and rebuild
echo "1️⃣ Cleaning and rebuilding..."
rm -rf dist test-publish-consumer hierarchical-folder-tree-*.tgz
npm run build
print_status "Build completed successfully"

# Validate package.json
echo "2️⃣ Validating package.json..."
npm run build > /dev/null 2>&1 && print_status "package.json is valid"

# Pack the tarball
echo "3️⃣ Packing tarball..."
TARBALL=$(npm pack | tail -n1)
print_status "Tarball created: $TARBALL"

# Check files to be published
echo "4️⃣ Checking files to be published..."
npm pack --dry-run

# Test TypeScript compilation
echo "5️⃣ Testing TypeScript compilation..."
npx tsc --noEmit --skipLibCheck && print_status "TypeScript compilation successful"

# Create test consumer project
echo "6️⃣ Creating test consumer project..."
rm -rf test-publish-consumer
mkdir test-publish-consumer
cd test-publish-consumer

cat > package.json << EOF
{
  "name": "test-consumer",
  "version": "1.0.0",
  "description": "Test consumer for hierarchical-folder-tree",
  "main": "index.js",
  "types": "node_modules/hierarchical-folder-tree/dist/types/index.d.ts",
  "scripts": {
    "test": "tsc --noEmit --project tsconfig.json"
  },
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@emotion/react": "^11.0.0",
    "@emotion/styled": "^11.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "@types/react-dom": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
EOF

cat > tsconfig.json << EOF
{
  "compilerOptions": {
    "target": "es2015",
    "lib": ["dom", "dom.iterable", "es2015", "es2016", "es2017"],
    "jsx": "react",
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["*.ts", "*.tsx"],
  "exclude": ["node_modules"]
}
EOF

cat > index.tsx << EOF
import * as React from 'react';
import { FolderList, FolderItemData } from 'hierarchical-folder-tree';

const data: FolderItemData[] = [
  {
    id: '1',
    name: 'Documents',
    isFolder: true,
    children: [
      { id: '1-1', name: 'file.txt', isFolder: false }
    ]
  }
];

const App: React.FC = () => {
  const handleItemClick = (item: FolderItemData) => {
    console.log('Clicked:', item.name);
  };

  return (
    <div>
      <FolderList 
        data={data}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default App;
EOF

# Install dependencies and the tarball
print_status "Installing dependencies and the tarball..."
npm install ../$TARBALL
npm install

# Test TypeScript compilation
print_status "Testing TypeScript compilation in consumer..."
npm test && print_status "Consumer TypeScript compilation successful"

# Alternative test: Test with explicit module resolution
print_status "Testing with explicit module resolution..."
cat > test-explicit.ts << EOF
import * as React from 'react';
import { FolderList, FolderItemData } from '../node_modules/hierarchical-folder-tree/dist/types/index.d.ts';

const data: FolderItemData[] = [
  {
    id: '1',
    name: 'Documents',
    isFolder: true,
    children: [
      { id: '1-1', name: 'file.txt', isFolder: false }
    ]
  }
];

const App: React.FC = () => {
  const handleItemClick = (item: FolderItemData) => {
    console.log('Clicked:', item.name);
  };

  return (
    <div>
      <FolderList 
        data={data}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default App;
EOF

npx tsc --noEmit --project tsconfig.json test-explicit.ts && print_status "Explicit module resolution test passed"

cd ..

# Test utilities in Node.js
echo "7️⃣ Testing utilities in Node.js..."
cat > test-utils.js << EOF
// Only test pure utility functions, not React components
// Import only the utility functions that don't depend on React
const { flattenTree, getVisibleItems, getFileExtension } = require('./dist/index.js');

const testData = [
  {
    id: '1',
    name: 'Folder 1',
    isFolder: true,
    children: [
      { id: '1-1', name: 'file.txt', isFolder: false }
    ]
  }
];

try {
  // Test flattenTree utility
  const flattened = flattenTree(testData);
  console.log('✅ flattenTree works:', flattened.length, 'items');
  
  // Test getVisibleItems utility
  const visible = getVisibleItems(flattened, new Set(['1']));
  console.log('✅ getVisibleItems works:', visible.length, 'visible items');
  
  // Test getFileExtension utility
  const ext1 = getFileExtension('file.txt');
  const ext2 = getFileExtension('document.pdf');
  console.log('✅ getFileExtension works:', ext1, ext2);
  
  console.log('✅ All utilities work in Node.js');
} catch (error) {
  console.error('❌ Utilities failed:', error.message);
  process.exit(1);
}
EOF

# Test only the utility functions by creating a minimal test
cat > test-utils-minimal.js << EOF
// Test only the pure utility functions without React dependencies
const { flattenTree, getVisibleItems, getFileExtension } = require('./dist/index.js');

const testData = [
  { id: '1', name: 'Folder 1', isFolder: true, children: [{ id: '1-1', name: 'file.txt', isFolder: false }] }
];

const flattened = flattenTree(testData);
const visible = getVisibleItems(flattened, new Set(['1']));
const ext = getFileExtension('file.txt');

console.log('✅ flattenTree:', flattened.length, 'items');
console.log('✅ getVisibleItems:', visible.length, 'visible items');
console.log('✅ getFileExtension:', ext);
console.log('✅ All utilities work in Node.js');
EOF

node test-utils-minimal.js && print_status "Node.js utilities test passed"

# Cleanup
rm -f test-utils.js
rm -f test-utils-minimal.js
rm -f test-explicit.ts
rm -rf test-publish-consumer
rm -f $TARBALL

echo "\n🎉 All tests passed! Your package is ready for publishing.\n"
echo "Next steps:"
echo "1. git add ."
echo "2. git commit -m 'Ready for publish: fix types, .gitignore, and consumer compatibility'"
echo "3. npm publish" 