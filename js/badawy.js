window.addEventListener('scroll', revealSections);

function revealSections() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        let windowHeight = window.innerHeight;
        let elementTop = reveals[i].getBoundingClientRect().top;
        let elementVisible = 90; // ظهور أسرع ومناسب للموبايل السريع

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}


  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  // الـ Config الحقيقية بتاعتك من الصورة
  const firebaseConfig = {
    apiKey: "AIzaSyDCuv6hvEsGtAceLrjiqF2WTYVQlqP_iM4",
    authDomain: "portfolio-comments-daa5e.firebaseapp.com",
    projectId: "portfolio-comments-daa5e",
    storageBucket: "portfolio-comments-daa5e.firebasestorage.app",
    messagingSenderId: "4252694929",
    appId: "1:4252694929:web:188950f43d308f07854230",
    measurementId: "G-T9SBY7FSY3"
  };

  // تهيئة الفايربيز والداتا بيز
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const commentsContainer = document.getElementById('commentsContainer');
  const commentForm = document.getElementById('commentForm');
  const submitBtn = document.getElementById('submitBtn');

  // جلب الكومنتات لايف (Realtime Update) من الكوليكشن بتاعك
  const q = query(collection(db, "portfolio_comments"), orderBy("timestamp", "desc"));
  
  onSnapshot(q, (snapshot) => {
      commentsContainer.innerHTML = ''; // تنظيف المكان
      
      if (snapshot.empty) {
          commentsContainer.innerHTML = '<div class="comment-loading">لا توجد تعليقات بعد، كن أول من يترك بصمته الفاخرة!</div>';
          return;
      }
      
      snapshot.forEach((doc) => {
          const data = doc.data();
          // تنسيق التاريخ والوقت بشكل عربي شيك
          const date = data.timestamp ? new Date(data.timestamp.toDate()).toLocaleDateString('ar-EG', {hour: '2-digit', minute:'2-digit'}) : '';
          
          commentsContainer.innerHTML += `
              <div class="single-comment-card">
                  <div class="comment-header">
                      <span class="comment-user-name">${data.name}</span>
                      <span class="comment-date">${date}</span>
                  </div>
                  <p class="comment-text">${data.text}</p>
              </div>
          `;
      });
  });

  // إرسال كومنت جديد
  commentForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('visitorName');
      const messageInput = document.getElementById('visitorMessage');

      // حماية الزرار ومنع التكرار
      submitBtn.disabled = true;
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>جاري الإرسال الفاخر...</span>';

      try {
          await addDoc(collection(db, "portfolio_comments"), {
              name: nameInput.value,
              text: messageInput.value,
              timestamp: new Date()
          });
          // تصفير الحقول بعد النجاح
          nameInput.value = '';
          messageInput.value = '';
      } catch (error) {
          console.error("Error adding document: ", error);
          alert("حدث خطأ أثناء إرسال تعليقك، حاول مرة أخرى يا هندسة.");
      } finally {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
      }
  });