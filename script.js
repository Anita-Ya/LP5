// WhiteSpot Landing Page Interactivity
document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll to Order / Inquiry section on CTA click
  const ctaBtn = document.querySelector('.cta-button');
  const stickyOrderBtn = document.getElementById('sticky-order-btn');
  const orderSection = document.getElementById('order-section');

  const scrollToOrder = () => {
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const nameInput = document.getElementById('user-name');
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 400);
      }
    }
  };

  if (ctaBtn) ctaBtn.addEventListener('click', scrollToOrder);
  if (stickyOrderBtn) stickyOrderBtn.addEventListener('click', scrollToOrder);

  // Modal Elements
  const thankyouModal = document.getElementById('thankyou-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOkBtn = document.getElementById('modal-ok-btn');
  const modalCustomerName = document.getElementById('modal-customer-name');
  const modalCustomerPhone = document.getElementById('modal-customer-phone');
  const modalOrderId = document.getElementById('modal-order-id');

  const closeModal = () => {
    if (thankyouModal) {
      thankyouModal.classList.remove('active');
      thankyouModal.setAttribute('aria-hidden', 'true');
    }
  };

  const openModal = (name, phone) => {
    if (!thankyouModal) return;

    // Set dynamic values
    if (modalCustomerName) modalCustomerName.textContent = name;
    if (modalCustomerPhone) modalCustomerPhone.textContent = `+91 ${phone}`;

    // Generate realistic Order ID
    const randomOrderId = 'WS-' + Math.floor(100000 + Math.random() * 900000);
    if (modalOrderId) modalOrderId.textContent = randomOrderId;

    thankyouModal.classList.add('active');
    thankyouModal.setAttribute('aria-hidden', 'false');
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOkBtn) modalOkBtn.addEventListener('click', closeModal);

  // Close when clicking on backdrop outside card
  if (thankyouModal) {
    thankyouModal.addEventListener('click', (e) => {
      if (e.target === thankyouModal) {
        closeModal();
      }
    });
  }

  // Form Validation & Submission
  const leadForm = document.getElementById('lead-form');
  const nameInput = document.getElementById('user-name');
  const phoneInput = document.getElementById('user-phone');
  const nameWrap = document.getElementById('name-input-wrap');
  const phoneWrap = document.getElementById('phone-input-wrap');
  const nameError = document.getElementById('name-error');
  const phoneError = document.getElementById('phone-error');

  const showError = (wrap, errorElem, message) => {
    if (wrap) wrap.classList.add('has-error');
    if (errorElem) {
      errorElem.textContent = message;
      errorElem.classList.add('visible');
    }
  };

  const clearError = (wrap, errorElem) => {
    if (wrap) wrap.classList.remove('has-error');
    if (errorElem) {
      errorElem.classList.remove('visible');
    }
  };

  const validateName = () => {
    if (!nameInput) return false;
    const value = nameInput.value.trim();

    if (!value) {
      showError(nameWrap, nameError, 'कृपया अपना पूरा नाम लिखें');
      return false;
    }

    // Must not contain digits or invalid symbols, only letters and spaces (Hindi and English)
    if (/\d/.test(value) || !/^[a-zA-Z\u0900-\u097F\s\.\']{2,50}$/.test(value)) {
      showError(nameWrap, nameError, 'कृपया केवल अक्षरों में नाम लिखें');
      return false;
    }

    clearError(nameWrap, nameError);
    return true;
  };

  const validatePhone = () => {
    if (!phoneInput) return false;
    const value = phoneInput.value.trim();

    // Must be 10 digits and start with 6, 7, 8, or 9
    if (!/^[6-9]\d{9}$/.test(value)) {
      showError(phoneWrap, phoneError, '10 अंकों का सही मोबाइल नंबर डालें (6-9 से शुरू)');
      return false;
    }

    clearError(phoneWrap, phoneError);
    return true;
  };

  // Real-time Input Listeners
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      if (nameWrap && nameWrap.classList.contains('has-error')) {
        validateName();
      }
    });
    nameInput.addEventListener('blur', () => {
      if (nameInput.value.trim()) {
        validateName();
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      // Allow only numbers up to 10 digits
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
      if (phoneWrap && phoneWrap.classList.contains('has-error')) {
        validatePhone();
      }
    });
    phoneInput.addEventListener('blur', () => {
      if (phoneInput.value.trim()) {
        validatePhone();
      }
    });
  }

  // Handle Form Submission
  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateName();
      const isPhoneValid = validatePhone();

      if (!isNameValid) {
        if (nameInput) nameInput.focus();
        return;
      }

      if (!isPhoneValid) {
        if (phoneInput) phoneInput.focus();
        return;
      }

      const name = nameInput.value.trim();
      const phone = phoneInput.value.trim();

      // Open thank you confirmation modal popup
      openModal(name, phone);

      // Reset form and clear any errors
      leadForm.reset();
      clearError(nameWrap, nameError);
      clearError(phoneWrap, phoneError);
    });
  }
});
