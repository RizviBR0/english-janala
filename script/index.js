const levelContainer = document.getElementById("level-container");
const wordContainer = document.getElementById("word-container");

const fetchData = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/levels/all",
  );

  try {
    if (res.ok) {
      const data = await res.json();
      displayLessons(data.data);
    } else {
      throw Error("Failed to fetch data");
    }
  } catch (e) {
    console.error("Error fetching data:", e);
  }
};

fetchData();

const removeActive = () => {
  const lessonButtons = levelContainer.querySelectorAll(".lesson-btn");

  lessonButtons.forEach((btn) => btn.classList.remove("btn-active"));
};

const displayLessons = (lessons) => {
  levelContainer.innerHTML = "";

  lessons.forEach((lesson) => {
    const lessonBtn = `<button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                        <i class="fa-solid fa-book-open"></i>
                        Lesson-${lesson.level_no}</button>`;

    levelContainer.innerHTML += lessonBtn;
  });
};

const loadLevelWord = (levelNo) => {
  manageSpinner(true);

  const url = `https://openapi.programming-hero.com/api/level/${levelNo}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickedBtn = document.getElementById(`lesson-btn-${levelNo}`);
      clickedBtn.classList.toggle("btn-active");

      displayLevelWords(data.data, false);
    })
    .catch((error) => console.log("Error fetching level data:", error));
};

const displayLevelWords = (words, isSearch) => {
  wordContainer.innerHTML = "";

  if (words.length == 0) {
    wordContainer.innerHTML = `
            <div class="py-10 text-center space-y-3 col-span-full">
            ${isSearch ? `<img src="./assets/ic_deco_search.png" alt="Alert Error Image" class="mx-auto">` : `<img src="./assets/alert-error.png" alt="Alert Error Image" class="mx-auto">`}
                <p class="text-[#79716B] font-bangla">${isSearch ? "কোন শব্দ পাওয়া যায়নি" : "এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি"}</p>
                <h1 class="font-bangla text-3xl font-medium">${isSearch ? "আবার চেষ্টা করুন" : "নেক্সট Lesson এ যান"}</h1>
            </div>
    `;

    manageSpinner(false);
    return;
  }

  words.forEach((word) => {
    const card = `
            <div class="card bg-white shadow-sm">
                <div class="card-body items-center text-center">
                    <h2 class="card-title font-bold text-3xl mb-4 ${word.word ? `text-black` : `text-red-400`}">${word.word ? word.word : "No word available"}</h2>
                    <p class="text-xl mb-4">Meaning / Pronounciation</p>
                    <p class="font-bangla font-bold text-3xl text-[#18181bc2] mb-14">"<span class="${word.meaning ? `text-[#18181bc2]` : `text-red-400`}">${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}</span> / <span class="${word.pronunciation ? `text-[#18181bc2]` : `text-red-400`}">${word.pronunciation ? word.pronunciation : "উচ্চারণ পাওয়া যায়নি"}</span>"</p>
                    <div class="flex justify-between w-full">
                        <button onclick="loadWordDetails(${word.id})"
                            class="bg-[#1A91FF]/10 p-4 rounded-lg text-[#374957] text-2xl cursor-pointer hover:bg-[#b1c9e1]"><i
                                class="fa-solid fa-circle-info"></i></button>
                        <button onclick="pronounceWord('${word.word}')"
                            class="bg-[#1A91FF]/10 p-4 rounded-lg text-[#374957] text-2xl cursor-pointer hover:bg-[#b1c9e1]"><i
                                class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>
            </div>
    `;

    wordContainer.innerHTML += card;
  });

  manageSpinner(false);
};

const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;

  const res = await fetch(url);
  const data = await res.json();

  displayWordDetails(data.data);
};

const displayWordDetails = (wordDetails) => {
  const modalDetailsContainer = document.getElementById(
    "modal-details-container",
  );

  modalDetailsContainer.innerHTML = `
    <h1 class="text-3xl font-semibold">${wordDetails.word} (<i class="fa-solid fa-microphone-lines"></i> :
                    <span>${wordDetails.pronunciation}</span>)
                </h1>
                <div class="space-y-2.5">
                    <h3 class="text-2xl font-semibold">Meaning</h3>
                    <p class="text-2xl font-medium">${wordDetails.meaning}</p>
                </div>
                <div class="space-y-2.5">
                    <h3 class="text-2xl font-semibold">Example</h3>
                    <p class="text-2xl font-normal">${wordDetails.sentence}</p>
                </div>
                <div class="space-y-2.5">
                    <h3 class="text-2xl font-medium font-bangla">সমার্থক শব্দ গুলো</h3>
                    <ul class="flex flex-row gap-4 flex-wrap">
                        ${wordDetails.synonyms
                          .map((synonym) => {
                            return `<li class="bg-[#EDF7FF] border border-[#D7E4EF] px-5 py-1.5 rounded-sm font-normal list-none">${synonym}</li>`;
                          })
                          .join("")}
                    </ul>
                </div>
  `;

  document.getElementById("word_modal").showModal();
};

const manageSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
    document.getElementById("spinner").classList.add("hidden");
    document.getElementById("word-container").classList.remove("hidden");
  }
};

document.getElementById("btn-search").addEventListener("click", () => {
  removeActive();

  const searchValue = document
    .getElementById("input-search")
    .value.toLowerCase();

  if (searchValue.length > 0) {
    fetch("https://openapi.programming-hero.com/api/words/all")
      .then((res) => res.json())
      .then((data) => {
        const filteredSearch = data.data.filter((word) =>
          word.word.toLowerCase().includes(searchValue),
        );
        displayLevelWords(filteredSearch, true);
      })
      .catch((err) => console.log("Error fetching search results:", err));
  } else {
    displayLevelWords([], true);
  }
});

function pronounceWord(word) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
