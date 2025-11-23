// Script de vérification : cherche tous les imports de pdfjs-dist
// Exécutez avec : node check-pdfjs.js

const fs = require('fs');
const path = require('path');

const extensions = ['.tsx', '.ts', '.jsx', '.js'];
const excludeDirs = ['node_modules', 'dist', '.git'];

function searchFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      if (!excludeDirs.includes(file)) {
        searchFiles(filePath);
      }
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Chercher les imports de pdfjs-dist
        if (content.match(/import.*['"]pdfjs-dist['"]/i) || 
            content.match(/import\(['"]pdfjs-dist['"]\)/i) ||
            content.match(/require\(['"]pdfjs-dist['"]\)/i)) {
          console.log('❌ TROUVÉ dans:', filePath);
          
          // Afficher la ligne
          const lines = content.split('\n');
          lines.forEach((line, index) => {
            if (line.match(/pdfjs-dist/i)) {
              console.log(`   Ligne ${index + 1}: ${line.trim()}`);
            }
          });
          console.log('');
        }
      }
    }
  });
}

console.log('🔍 Recherche des imports de pdfjs-dist...\n');
searchFiles('./');

// Vérifier package.json
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
if (packageJson.dependencies && packageJson.dependencies['pdfjs-dist']) {
  console.log('❌ pdfjs-dist trouvé dans package.json dependencies');
}
if (packageJson.devDependencies && packageJson.devDependencies['pdfjs-dist']) {
  console.log('❌ pdfjs-dist trouvé dans package.json devDependencies');
}

console.log('\n✅ Vérification terminée !');
console.log('\nSi vous voyez des ❌, supprimez ces imports et remplacez-les par window.pdfjsLib');
