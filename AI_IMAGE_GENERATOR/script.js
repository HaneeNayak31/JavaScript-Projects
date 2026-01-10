/* =======================
   CONFIG
======================= */

const API_KEY = "YOUR_HF_API_KEY"; // Replace this with your actual Hugging Face API key
const ROUTER_URL = "https://router.huggingface.co/nscale/v1/images/generations";
const baseSize = 512;

/* =======================
   DOM ELEMENTS
======================= */

const themeToggle = document.querySelector(".theme-toggle");
const promptBtn = document.querySelector(".prompt-btn");
const promptInput = document.querySelector(".prompt-input");
const promptForm = document.querySelector(".prompt-form");
const modelSelect = document.getElementById("model-select");
const countSelect = document.getElementById("count-select");
const ratioSelect = document.getElementById("ratio-select");
const gridGallery = document.querySelector(".gallery-grid");

/* =======================
   SAMPLE PROMPTS
======================= */

const examplePrompts = [
  "A magic forest with glowing plants and fairy homes among giant mushrooms",
  "An old steampunk airship floating through golden clouds at sunset",
  "A future Mars colony with glass domes and gardens against red mountains",
  "A dragon sleeping on gold coins in a crystal cave",
  "An underwater kingdom with merpeople and glowing coral buildings",
  "A floating island with waterfalls pouring into clouds below",
  "A witch's cottage in fall with magic herbs in the garden",
  "A robot painting in a sunny studio with art supplies around it",
  "A magical library with floating glowing books and spiral staircases",
  "A cyberpunk city with neon signs and flying cars at night",
];

/* =======================
   THEME HANDLING
======================= */

(() => {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
  const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
  document.body.classList.toggle("dark-theme", isDark);
  themeToggle.querySelector("i").className = isDark
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
})();

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeToggle.querySelector("i").className = isDark
    ? "fa-solid fa-sun"
    : "fa-solid fa-moon";
});

/* =======================
   HELPERS
======================= */

function getImageDimensions(aspectRatio) {
  const [w, h] = aspectRatio.split("/").map(Number);
  const scale = baseSize / Math.sqrt(w * h);
  return {
    width: Math.floor((w * scale) / 16) * 16,
    height: Math.floor((h * scale) / 16) * 16,
  };
}

function base64ToImage(base64) {
  return `data:image/png;base64,${base64}`;
}

/* =======================
   API CALL
======================= */

async function queryImage({ model, prompt, width, height }) {
  const response = await fetch(ROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      prompt,
      response_format: "b64_json",
      width,
      height,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
  }

  const data = await response.json();

  if (!data?.data?.[0]?.b64_json) {
    throw new Error("Empty image data");
  }

  return data.data[0].b64_json;
}

/* =======================
   IMAGE GENERATION
======================= */

async function generateImages(model, count, ratio, prompt) {
  const { width, height } = getImageDimensions(ratio);

  const jobs = Array.from({ length: count }, async (_, i) => {
    const card = document.getElementById(`img-card-${i}`);
    const img = card.querySelector(".result-img");
    const downloadBtn = card.querySelector(".download-btn");

    try {
      const base64 = await queryImage({
        model,
        prompt,
        width,
        height,
      });

      const src = base64ToImage(base64);

      // wait for image to fully load
      img.onload = () => {
        card.classList.remove("loading");
      };

      img.onerror = () => {
        throw new Error("Image load failed");
      };

      img.src = src;

      downloadBtn.onclick = () => {
        const a = document.createElement("a");
        a.href = src;
        a.download = `ai-image-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      };
    } catch (err) {
      console.error(err);
      card.classList.remove("loading");
      card.classList.add("error");
      card.querySelector(".status-text").innerText = "Model busy. Try again.";
    }
  });

  await Promise.allSettled(jobs);
}

/* =======================
   UI CREATION
======================= */

function createImageCards(model, count, ratio, prompt) {
  gridGallery.innerHTML = "";

  for (let i = 0; i < count; i++) {
    gridGallery.innerHTML += `
      <div class="img-card loading" id="img-card-${i}" style="aspect-ratio:${ratio}">
        <div class="status-container">
          <div class="spinner"></div>
          <i class="fa-solid fa-triangle-exclamation"></i>
          <p class="status-text">Generating...</p>
        </div>
        <img class="result-img" />
        <div class="img-overlay">
          <button class="download-btn">
            <i class="fa-solid fa-download"></i>
          </button>
        </div>
      </div>
    `;
  }

  generateImages(model, count, ratio, prompt);
}

/* =======================
   FORM HANDLING
======================= */

promptForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const model = modelSelect.value;
  const count = parseInt(countSelect.value) || 1;
  const ratio = ratioSelect.value || "1/1";
  const prompt = promptInput.value.trim();

  if (!model || !prompt) return;

  createImageCards(model, count, ratio, prompt);
});

/* =======================
   RANDOM PROMPT
======================= */

promptBtn.addEventListener("click", () => {
  promptInput.value =
    examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
  promptInput.focus();
});

// /* =======================
//    CONFIG
// ======================= */

// const API_KEY = "YOUR_HF_API_KEY";
// const ROUTER_URL = "https://router.huggingface.co/nscale/v1/images/generations";
// const baseSize = 512;

// /* =======================
//    DOM ELEMENTS
// ======================= */

// const themeToggle = document.querySelector(".theme-toggle");
// const promptBtn = document.querySelector(".prompt-btn");
// const promptInput = document.querySelector(".prompt-input");
// const promptForm = document.querySelector(".prompt-form");
// const modelSelect = document.getElementById("model-select");
// const countSelect = document.getElementById("count-select");
// const ratioSelect = document.getElementById("ratio-select");
// const gridGallery = document.querySelector(".gallery-grid");

// /* =======================
//    SAMPLE PROMPTS
// ======================= */

// const examplePrompts = [
//   "A magic forest with glowing plants and fairy homes among giant mushrooms",
//   "An old steampunk airship floating through golden clouds at sunset",
//   "A future Mars colony with glass domes and gardens against red mountains",
//   "A dragon sleeping on gold coins in a crystal cave",
//   "An underwater kingdom with merpeople and glowing coral buildings",
//   "A floating island with waterfalls pouring into clouds below",
//   "A witch's cottage in fall with magic herbs in the garden",
//   "A robot painting in a sunny studio with art supplies around it",
//   "A magical library with floating glowing books and spiral staircases",
//   "A cyberpunk city with neon signs and flying cars at night",
// ];

// /* =======================
//    THEME HANDLING
// ======================= */

// (() => {
//   const savedTheme = localStorage.getItem("theme");
//   const prefersDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
//   const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
//   document.body.classList.toggle("dark-theme", isDark);
//   themeToggle.querySelector("i").className = isDark
//     ? "fa-solid fa-sun"
//     : "fa-solid fa-moon";
// })();

// themeToggle.addEventListener("click", () => {
//   const isDark = document.body.classList.toggle("dark-theme");
//   localStorage.setItem("theme", isDark ? "dark" : "light");
//   themeToggle.querySelector("i").className = isDark
//     ? "fa-solid fa-sun"
//     : "fa-solid fa-moon";
// });

// /* =======================
//    HELPERS
// ======================= */

// // aspect ratio → dimensions
// function getImageDimensions(aspectRatio) {
//   const [w, h] = aspectRatio.split("/").map(Number);
//   const scale = baseSize / Math.sqrt(w * h);
//   let width = Math.floor((w * scale) / 16) * 16;
//   let height = Math.floor((h * scale) / 16) * 16;
//   return { width, height };
// }

// // base64 → image src
// function base64ToImage(base64) {
//   return `data:image/png;base64,${base64}`;
// }

// /* =======================
//    HUGGING FACE ROUTER API
// ======================= */

// async function queryImage({ model, prompt, width, height }) {
//   const response = await fetch(ROUTER_URL, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model,
//       prompt,
//       response_format: "b64_json",
//       width,
//       height,
//     }),
//   });

//   if (!response.ok) {
//     const text = await response.text();
//     throw new Error(text);
//   }

//   return response.json();
// }

// /* =======================
//    IMAGE GENERATION
// ======================= */

// async function generateImages(model, count, ratio, prompt) {
//   const { width, height } = getImageDimensions(ratio);

//   const tasks = Array.from({ length: count }, async (_, i) => {
//     const card = document.getElementById(`img-card-${i}`);
//     const img = card.querySelector(".result-img");
//     const downloadBtn = card.querySelector(".download-btn");

//     try {
//       const result = await queryImage({
//         model,
//         prompt,
//         width,
//         height,
//       });

//       const imageSrc = base64ToImage(result.data[0].b64_json);
//       img.src = imageSrc;

//       // download logic
//       downloadBtn.onclick = () => {
//         const a = document.createElement("a");
//         a.href = imageSrc;
//         a.download = `ai-image-${Date.now()}.png`;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//       };

//       card.classList.remove("loading");
//     } catch (err) {
//       console.error(err);
//       card.classList.remove("loading");
//       card.classList.add("error");
//       card.querySelector(".status-text").innerText = "Failed";
//     }
//   });

//   await Promise.allSettled(tasks);
// }

// /* =======================
//    UI CARD CREATION
// ======================= */

// function createImageCards(model, count, ratio, prompt) {
//   gridGallery.innerHTML = "";

//   for (let i = 0; i < count; i++) {
//     gridGallery.innerHTML += `
//       <div class="img-card loading" id="img-card-${i}" style="aspect-ratio:${ratio}">
//         <div class="status-container">
//           <div class="spinner"></div>
//           <i class="fa-solid fa-triangle-exclamation"></i>
//           <p class="status-text">Generating...</p>
//         </div>

//         <img class="result-img" />

//         <div class="img-overlay">
//           <button class="download-btn">
//             <i class="fa-solid fa-download"></i>
//           </button>
//         </div>
//       </div>
//     `;
//   }

//   generateImages(model, count, ratio, prompt);
// }

// /* =======================
//    FORM HANDLING
// ======================= */

// promptForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const model = modelSelect.value;
//   const count = parseInt(countSelect.value) || 1;
//   const ratio = ratioSelect.value || "1/1";
//   const prompt = promptInput.value.trim();

//   if (!model || !prompt) return;

//   createImageCards(model, count, ratio, prompt);
// });

// /* =======================
//    RANDOM PROMPT BUTTON
// ======================= */

// promptBtn.addEventListener("click", () => {
//   const randomPrompt =
//     examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
//   promptInput.value = randomPrompt;
//   promptInput.focus();
// });

// /* =======================
//    CONFIG
// ======================= */

// const API_KEY = "YOUR_HF_API_KEY";
// const ROUTER_URL = "https://router.huggingface.co/nscale/v1/images/generations";

// const baseSize = 512;

// /* =======================
//    DOM ELEMENTS
// ======================= */

// const themeToggle = document.querySelector(".theme-toggle");
// const promptBtn = document.querySelector(".prompt-btn");
// const promptInput = document.querySelector(".prompt-input");
// const promptForm = document.querySelector(".prompt-form");
// const modelSelect = document.getElementById("model-select");
// const countSelect = document.getElementById("count-select");
// const ratioSelect = document.getElementById("ratio-select");
// const gridGallery = document.querySelector(".gallery-grid");

// /* =======================
//    SAMPLE PROMPTS
// ======================= */

// const examplePrompts = [
//   "A magic forest with glowing plants and fairy homes among giant mushrooms",
//   "An old steampunk airship floating through golden clouds at sunset",
//   "A future Mars colony with glass domes and gardens against red mountains",
//   "A dragon sleeping on gold coins in a crystal cave",
//   "An underwater kingdom with merpeople and glowing coral buildings",
//   "A floating island with waterfalls pouring into clouds below",
//   "A witch's cottage in fall with magic herbs in the garden",
//   "A robot painting in a sunny studio with art supplies around it",
//   "A magical library with floating glowing books and spiral staircases",
//   "A cyberpunk city with neon signs and flying cars at night",
// ];

// /* =======================
//    THEME HANDLING
// ======================= */

// (() => {
//   const savedTheme = localStorage.getItem("theme");
//   const prefersDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
//   const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
//   document.body.classList.toggle("dark-theme", isDark);
//   themeToggle.querySelector("i").className = isDark
//     ? "fa-solid fa-sun"
//     : "fa-solid fa-moon";
// })();

// themeToggle.addEventListener("click", () => {
//   const isDark = document.body.classList.toggle("dark-theme");
//   localStorage.setItem("theme", isDark ? "dark" : "light");
//   themeToggle.querySelector("i").className = isDark
//     ? "fa-solid fa-sun"
//     : "fa-solid fa-moon";
// });

// /* =======================
//    HELPERS
// ======================= */

// // aspect ratio → dimensions
// function getImageDimensions(aspectRatio) {
//   const [w, h] = aspectRatio.split("/").map(Number);
//   const scale = baseSize / Math.sqrt(w * h);
//   let width = Math.floor((w * scale) / 16) * 16;
//   let height = Math.floor((h * scale) / 16) * 16;
//   return { width, height };
// }

// // base64 → image src
// function base64ToImage(b64) {
//   return `data:image/png;base64,${b64}`;
// }

// /* =======================
//    HUGGING FACE ROUTER CALL
// ======================= */

// async function queryImage({ model, prompt, width, height }) {
//   const response = await fetch(ROUTER_URL, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${API_KEY}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       model,
//       prompt,
//       response_format: "b64_json",
//       width,
//       height,
//     }),
//   });

//   if (!response.ok) {
//     const text = await response.text();
//     throw new Error(text);
//   }

//   return response.json();
// }

// /* =======================
//    IMAGE GENERATION
// ======================= */

// async function generateImages(model, count, ratio, prompt) {
//   const { width, height } = getImageDimensions(ratio);

//   const jobs = Array.from({ length: count }, async (_, i) => {
//     const card = document.getElementById(`img-card-${i}`);
//     const img = card.querySelector(".result-img");

//     try {
//       const result = await queryImage({
//         model,
//         prompt,
//         width,
//         height,
//       });

//       img.src = base64ToImage(result.data[0].b64_json);
//       card.classList.remove("loading");
//     } catch (err) {
//       console.error(err);
//       card.classList.remove("loading");
//       card.classList.add("error");
//       card.querySelector(".status-text").innerText = "Failed";
//     }
//   });

//   await Promise.allSettled(jobs);
// }

// /* =======================
//    UI CARD CREATION
// ======================= */

// function createImageCards(model, count, ratio, prompt) {
//   gridGallery.innerHTML = "";

//   for (let i = 0; i < count; i++) {
//     gridGallery.innerHTML += `
//       <div class="img-card loading" id="img-card-${i}" style="aspect-ratio:${ratio}">
//         <div class="status-container">
//           <div class="spinner"></div>
//           <i class="fa-solid fa-triangle-exclamation"></i>
//           <p class="status-text">Generating...</p>
//         </div>
//         <img class="result-img" />
//       </div>
//     `;
//   }

//   generateImages(model, count, ratio, prompt);
// }

// /* =======================
//    FORM HANDLING
// ======================= */

// promptForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   const model = modelSelect.value;
//   const count = parseInt(countSelect.value) || 1;
//   const ratio = ratioSelect.value || "1/1";
//   const prompt = promptInput.value.trim();

//   if (!model || !prompt) return;

//   createImageCards(model, count, ratio, prompt);
// });

// /* =======================
//    RANDOM PROMPT BUTTON
// ======================= */

// promptBtn.addEventListener("click", () => {
//   const random =
//     examplePrompts[Math.floor(Math.random() * examplePrompts.length)];
//   promptInput.value = random;
//   promptInput.focus();
// });
