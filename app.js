// Mock frontend app - wallet import modal functionality

console.log('Educredentials app initialized');

// Wallet Import Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('wallet-modal');
    const btn = document.getElementById('import-wallet-btn');
    const closeBtn = document.querySelector('.modal-close');
    const qrcodeContainer = document.getElementById('qrcode');

    // QR code value
    const qrValue = 'foo://bar?baz=value';
    let qrTimer;

    // Function to generate QR code
    function generateQRCode() {
        qrcodeContainer.innerHTML = '';
        new QRCode(qrcodeContainer, {
            text: qrValue,
            width: 200,
            height: 200,
            colorDark: '#0a0a0a',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    // Open modal and generate QR code
    btn.onclick = function() {
        modal.style.display = 'flex';
        generateQRCode();
        
        // Start timer to regenerate QR every 10 seconds
        qrTimer = setInterval(generateQRCode, 10000);
    };

    // Close modal when clicking the X
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        clearInterval(qrTimer);
    };

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            clearInterval(qrTimer);
        }
    };
});
