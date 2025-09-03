// دالة التمرير إلى قسم التواصل
function scrollToContact() {
  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// عند إرسال النموذج
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault(); // منع إعادة تحميل الصفحة

  // جمع البيانات
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  // التحقق من أن الحقول ليست فارغة
  if (!name || !email || !message) {
    alert('من فضلك املأ جميع الحقول.');
    return;
  }
// كود JavaScript لتحريك الأرقام
document.addEventListener('DOMContentLoaded', function() {
  // تحديد العناصر التي تحتوي على الأرقام
  const statNumbers = document.querySelectorAll('.stat-number');
  
  // تهيئة كائن Intersection Observer لتتبع ظهور الأرقام في الشاشة
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // عندما يظهر العنصر في الشاشة، ابدأ تحريك الرقم
        animateNumber(entry.target);
        // توقف عن مراقبة العنصر بعد تحريكه
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 }); // عندما يكون 50% من العنصر مرئيًا
  
  // بدء مراقبة جميع عناصر الأرقام
  statNumbers.forEach(number => {
    observer.observe(number);
  });
  
  // دالة لتحريك الرقم
  function animateNumber(element) {
    const finalValue = parseFloat(element.textContent.replace(/[^0-9.]/g, ''));
    const hasSymbol = element.textContent.includes('%') || element.textContent.includes('/');
    const symbol = element.textContent.replace(/[0-9.]/g, '');
    const duration = 2000; // مدة التحريك بالمللي ثانية
    const steps = 60; // عدد الخطوات
    const stepDuration = duration / steps;
    let currentStep = 0;
    
    // تحديد إذا كان الرقم يحتوي على كسر
    const isDecimal = finalValue % 1 !== 0;
    
    element.style.color = '#10b981'; // تغيير اللون أثناء التحريك
    element.style.transition = 'color 0.3s ease';
    
    const interval = setInterval(() => {
      currentStep++;
      let progress = currentStep / steps;
      
      // تطبيق تأثير easing لجعل الحركة أكثر سلاسة
      progress = easeOutQuart(progress);
      
      let currentValue;
      if (isDecimal) {
        currentValue = (finalValue * progress).toFixed(1);
      } else {
        currentValue = Math.floor(finalValue * progress);
      }
      
      // إضافة الرمز إذا كان موجوداً
      element.textContent = currentValue + symbol;
      
      if (currentStep === steps) {
        clearInterval(interval);
        // إعادة اللون إلى الأصلي بعد انتهاء التحريك
        setTimeout(() => {
          element.style.color = '';
        }, 500);
      }
    }, stepDuration);
  }
  
  // دالة تأثير Easing لجعل الحركة أكثر سلاسة
  function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
  }
  
  // دالة للتمرير إلى قسم التواصل
  window.scrollToContact = function() {
    document.getElementById('contact').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };
  
  // إضافة تأثير عند إرسال نموذج التواصل
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('.btn-submit');
      submitBtn.textContent = 'جاري الإرسال...';
      submitBtn.disabled = true;
      
      // محاكاة عملية الإرسال (يمكن استبدالها برمز الإرسال الفعلي)
      setTimeout(() => {
        alert('تم إرسال رسالتك بنجاح! سوف يتم التواصل معك قريباً.');
        submitBtn.textContent = 'إرسال الرسالة';
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2000);
    });
  }
});
  // رقم الواتساب (تأكد من كتابته بدون أخطاء)
  const whatsappNumber = "+201070505730"; // ✅ تأكد من صحته

  // صياغة الرسالة
  const text = `
مرحباً محمود،

لديك رسالة جديدة من عميل:

👤 الاسم: ${name}
📧 البريد: ${email}
💬 الرسالة:
${message}

تحياتي.`;

  // ترميز النص ليعمل في الرابط
  const encodedMessage = encodeURIComponent(text);

  // بناء رابط واتساب بشكل صحيح
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  // فتح الرابط في نافذة جديدة
  window.open(whatsappLink, '_blank', 'noopener,noreferrer');

  // رسالة تأكيد (اختياري)
  alert('جاري فتح واتساب لإرسال رسالتك...');
});