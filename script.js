/**
 * 名色艺术画廊 - 交互脚本
 * Iconic Color Palette Gallery - Interactive Script
 */

document.addEventListener('DOMContentLoaded', () => {
    initCopyFunctionality();
    initSwatchCopy();
});

/**
 * Initialize copy functionality for color values
 */
function initCopyFunctionality() {
    const valueCodes = document.querySelectorAll('.value-code[data-copy]');

    valueCodes.forEach(code => {
        code.addEventListener('click', (e) => {
            e.stopPropagation();
            const textToCopy = code.getAttribute('data-copy');
            copyToClipboard(textToCopy);
        });
    });
}

/**
 * Initialize swatch click to copy HEX value
 */
function initSwatchCopy() {
    const swatches = document.querySelectorAll('.canvas');

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const colorCode = swatch.getAttribute('data-copy');
            if (colorCode) {
                copyToClipboard(colorCode);
            }
        });
    });
}

/**
 * Copy text to clipboard and show toast notification
 * @param {string} text - Text to copy
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast(`已复制: ${text}`);
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();

        try {
            document.execCommand('copy');
            showToast(`已复制: ${text}`);
        } catch (e) {
            showToast('复制失败，请手动复制');
        }

        document.body.removeChild(textarea);
    }
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 */
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');

    // Remove existing timeout if any
    if (toast.timeout) {
        clearTimeout(toast.timeout);
    }

    // Hide toast after delay
    toast.timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

/**
 * Optional: Add intersection observer for scroll animations
 * Uncomment if you want more sophisticated scroll animations
 */
/*
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.color-card').forEach(card => {
        observer.observe(card);
    });
}
*/
