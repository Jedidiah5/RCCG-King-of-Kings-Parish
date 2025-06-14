const { execSync } = require('child_process');
const path = require('path');

try {
  // Ensure we're in the project directory
  process.chdir(__dirname);
  
  // Install dependencies
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Run the build
  console.log('Building project...');
  execSync('npx vite build', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
} 