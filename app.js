// Mock frontend app - wallet import modal functionality

console.log('Educredentials app initialized');

// Wallet Import Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('wallet-modal');
    const btn = document.getElementById('import-wallet-btn');
    const closeBtn = document.querySelector('.modal-close');

    // QR code value
    const qrValue = 'foo://bar?baz=value';

    // Open modal and generate QR code
    btn.onclick = function() {
        modal.style.display = 'flex';
        
        // Clear previous QR code if any
        document.getElementById('qrcode').innerHTML = '';
        
        // Generate new QR code
        new QRCode(document.getElementById('qrcode'), {
            text: qrValue,
            width: 200,
            height: 200,
            colorDark: '#0a0a0a',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    };

    // Close modal when clicking the X
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
