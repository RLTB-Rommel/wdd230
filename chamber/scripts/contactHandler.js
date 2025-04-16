document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // prevent actual submission
  
      const newMessage = {
        fullname: form.fullname.value,
        email: form.email.value,
        subject: form.subject.value,
        message: form.message.value,
        date: new Date().toISOString()
      };
  
      let messages = JSON.parse(localStorage.getItem('chamberMessages')) || [];
      messages.push(newMessage);
      localStorage.setItem('chamberMessages', JSON.stringify(messages));
  
      alert('Your message has been sent!');
  
      form.reset();
    });
  });