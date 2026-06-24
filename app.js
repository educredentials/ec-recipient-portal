// Mock frontend app - wallet import modal functionality

console.log('Educredentials app initialized');

// Wallet Import Modal
document.addEventListener('DOMContentLoaded', function() {
    const walletModal = document.getElementById('wallet-modal');
    const errorModal = document.getElementById('error-modal');
    const btn = document.getElementById('import-wallet-btn');
    const closeBtns = document.querySelectorAll('.modal-close');
    const qrcodeContainer = document.getElementById('qrcode');
    const errorMessageEl = document.getElementById('error-message');

    let qrTimer;
    let currentQRUri = '';
    const awardId = 'award-123';

    // Function to show error modal
    function showError(error) {
        const message = error.message || 'A generic error occurred';
        errorMessageEl.textContent = message;
        errorModal.style.display = 'flex';
    }

    // Function to close all modals
    function closeAllModals() {
        walletModal.style.display = 'none';
        errorModal.style.display = 'none';
        clearInterval(qrTimer);
    }

    // Function to load QR code content from API and regenerate QR
    async function loadAndGenerateQR() {
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
                const errorData = await response.json().catch(() => ({}));
                const errorMsg = errorData.error || errorData.message || 'Request failed';
                throw new Error(errorMsg);
            }
            
            const data = await response.json();
            currentQRUri = data.uri;
            
            // Regenerate QR code with new URI
            qrcodeContainer.innerHTML = '';
            new QRCode(qrcodeContainer, {
                text: currentQRUri,
                width: 200,
                height: 200,
                colorDark: '#0a0a0a',
                colorLight: '#ffffff',
                correctLevel: QRCode.CorrectLevel.H
            });
        } catch (error) {
            console.error('Error loading QR content:', error);
            showError(error);
            walletModal.style.display = 'none';
        }
    }

    // Open modal and load QR content
    btn.onclick = function() {
        walletModal.style.display = 'flex';
        
        // Initial load
        loadAndGenerateQR();
        
        // Start timer to re-fetch and regenerate QR every 10 seconds
        qrTimer = setInterval(loadAndGenerateQR, 10000);
    };

    // Close modals when clicking the X
    closeBtns.forEach(function(btn) {
        btn.onclick = closeAllModals;
    });

    // Close modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target === walletModal || event.target === errorModal) {
            closeAllModals();
        }
    };
});
