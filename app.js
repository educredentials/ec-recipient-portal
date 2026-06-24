// Mock frontend app - wallet import modal functionality

console.log('Educredentials app initialized');

// Wallet Import Modal
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('wallet-modal');
    const btn = document.getElementById('import-wallet-btn');
    const closeBtn = document.querySelector('.modal-close');
    const qrcodeContainer = document.getElementById('qrcode');

    let qrTimer;
    let currentQRUri = '';

    // Function to load QR code content from API
    async function loadQRContent(awardId) {
        try {
            const response = await fetch('http://localhost:8000/api/v1/offers', {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer test-token',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ award_id: awardId })
            });
            
            if (!response.ok) {
                throw new Error('Failed to load QR content');
            }
            
            const data = await response.json();
            currentQRUri = data.uri;
            return data.uri;
        } catch (error) {
            console.error('Error loading QR content:', error);
            // Fallback to hardcoded value if API fails
            currentQRUri = 'foo://bar?baz=value';
            return currentQRUri;
        }
    }

    // Function to generate QR code
    function generateQRCode() {
        if (!currentQRUri) return;
        
        qrcodeContainer.innerHTML = '';
        new QRCode(qrcodeContainer, {
            text: currentQRUri,
            width: 200,
            height: 200,
            colorDark: '#0a0a0a',
            colorLight: '#ffffff',
            correctLevel: QRCode.CorrectLevel.H
        });
    }

    // Open modal and load QR content
    btn.onclick = async function() {
        modal.style.display = 'flex';
        
        // Load QR content from API
        const awardId = 'award-123';
        await loadQRContent(awardId);
        
        // Generate initial QR code
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
