/* =========================
   Smooth Scroll
========================= */
document.querySelectorAll("a[href^='#']").forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    document.querySelector(link.getAttribute("href"))
      .scrollIntoView({behavior:"smooth"});
  });
});

/* =========================
   Experience Modal
========================= */
function openExperienceModal(){
  document.getElementById("experienceModal").style.display = "block";
}

function closeExperienceModal(){
  document.getElementById("experienceModal").style.display = "none";
}

/* =========================
   Experiences Logic
========================= */
const gallery = document.getElementById("gallery");
const form = document.getElementById("experienceForm");

document.addEventListener("DOMContentLoaded", loadExperiences);

form.addEventListener("submit", function(e){
  e.preventDefault();

  const name = form.name.value;
  const place = form.place.value;
  const comment = form.comment.value;
  const file = form.media.files[0];

  if(!file){
    alert("الرجاء رفع صورة أو فيديو");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(){
    const experience = {
      name,
      place,
      comment,
      media: reader.result,
      type: file.type.startsWith("video") ? "video" : "image"
    };

    saveExperience(experience);
    addExperienceToUI(experience);

    closeExperienceModal();
    form.reset();
  };

  reader.readAsDataURL(file);
});

/* =========================
   UI Functions
========================= */
function addExperienceToUI(exp){
  const card = document.createElement("div");
  card.className = "gallery-card";

  card.innerHTML = `
    ${exp.type === "image"
      ? `<img src="${exp.media}" alt="">`
      : `<video src="${exp.media}" controls></video>`}
    <div class="card-content">
      <h4>${exp.place}</h4>
      <p>${exp.comment}</p>
      <span>— ${exp.name}</span>
    </div>
  `;

  gallery.prepend(card);
}

function saveExperience(exp){
  const data = JSON.parse(localStorage.getItem("experiences")) || [];
  data.push(exp);
  localStorage.setItem("experiences", JSON.stringify(data));
}

function loadExperiences(){
  const data = JSON.parse(localStorage.getItem("experiences")) || [];
  data.forEach(addExperienceToUI);
}

const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".service-card");

tabs.forEach(tab=>{
  tab.addEventListener("click",()=>{
    tabs.forEach(t=>t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;

    cards.forEach(card=>{
      card.style.display =
        filter === "all" || card.classList.contains(filter)
          ? "block"
          : "none";
    });
  });
});

