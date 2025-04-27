const QRCode = require('qrcode');
const Jimp = require('jimp');



// SIN LOGO
// const QRCode = require('qrcode');

// QRCode.toFile('./file.png', 'Encode this text in QR code', {
//   errorCorrectionLevel: 'H'
// }, function(err) {
//   if (err) throw err;
//   console.log('QR code saved!');
// });




// CON LOGO
// Función para generar el QR con logo
async function generateQRCodeWithLogo() {
  try {
    // Paso 1: Generar el código QR
    const qrImagePath = './file.png'; // La ruta donde guardamos el QR
    await QRCode.toFile(qrImagePath, 'https://constructorarepso.com/', {
      errorCorrectionLevel: 'H', // Nivel de corrección de errores
      width: 300 // Ajusta el tamaño del QR
    });

    // Paso 2: Cargar el QR generado
    const qrImage = await Jimp.read(qrImagePath);

    // Paso 3: Cargar el logo
    const logo = await Jimp.read('logo.png'); // Aquí agregas tu logo

    // Paso 4: Redimensionar el logo para que quede centrado y en un tamaño adecuado
    const logoSize = qrImage.bitmap.width / 5; // Ajustamos el tamaño del logo a 1/5 del QR
    logo.resize(logoSize, logoSize); // Redimensionamos el logo

    // Paso 5: Calcular la posición para centrar el logo
    const x = (qrImage.bitmap.width - logo.bitmap.width) / 2;
    const y = (qrImage.bitmap.height - logo.bitmap.height) / 2;

    // Paso 6: Poner el logo sobre el QR
    qrImage.composite(logo, x, y);

    // Paso 7: Guardar la imagen con el logo
    await qrImage.writeAsync('./qr-with-logo.png');
    console.log('QR con logo guardado!');
  } catch (err) {
    console.error('Error generando QR con logo:', err);
  }
}

// Ejecutar la función
generateQRCodeWithLogo();
