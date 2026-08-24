/* =========================================================
   THE DOM — EXPERIENCE REVIEW SYSTEM
   CLEAN RENEWED JS — PART 1/3
   ========================================================= */


/* =========================================================
   PLATFORM LINKS
   ========================================================= */

const PLATFORM_LINKS = {

  swiggy:
    "https://swiggy.onelink.me/BVRZ?af_dp=swiggydiners%3A%2F%2Fdetails%2F719877%3Fsource%3Dsharing%20Happy%20dining!",

  zomato:
    "https://zomato.onelink.me/xqzv/czjn9w2o",

  district:
    "https://link.district.in/DSTRKT/o7dmfgbx",

  google:
    "https://search.google.com/local/writereview?placeid=ChIJPRWWqFcDDTkRoikpMPDLVos",

  instagram:
    "https://www.instagram.com/thedom_loungedineandbar?igsi=eGdxYWloaWZxMDd2",

  facebook:
    "https://www.facebook.com/share/1MQGKeBsR9/"

};


/* =========================================================
   DOM ELEMENTS
   ========================================================= */

const experienceScreen =
  document.getElementById("experienceScreen");

const ratingScreen =
  document.getElementById("ratingScreen");

const loadingScreen =
  document.getElementById("loadingScreen");

const reviewScreen =
  document.getElementById("reviewScreen");

const platformScreen =
  document.getElementById("platformScreen");


const experienceGrid =
  document.getElementById("experienceGrid");

const selectedCount =
  document.getElementById("selectedCount");

const selectionStatus =
  document.getElementById("selectionStatus");

const selectionText =
  document.getElementById("selectionText");

const experienceNext =
  document.getElementById("experienceNext");


const experienceRatings =
  document.getElementById("experienceRatings");

const createReviewButton =
  document.getElementById("createReviewButton");


const loadingProgress =
  document.getElementById("loadingProgress");

const loadingPercent =
  document.getElementById("loadingPercent");

const loadingMessage =
  document.getElementById("loadingMessage");


const generatedReview =
  document.getElementById("generatedReview");

const reviewStars =
  document.getElementById("reviewStars");

const copyReviewButton =
  document.getElementById("copyReviewButton");

const copyMessage =
  document.getElementById("copyMessage");


const toast =
  document.getElementById("toast");

const toastText =
  document.getElementById("toastText");


/* =========================================================
   EXPERIENCE DATA
   ========================================================= */

const optionData = {

  Food: {
    emoji: "🍽️",
    description: "Taste & presentation"
  },

  Drinks: {
    emoji: "🍸",
    description: "Cocktails & beverages"
  },

  Ambience: {
    emoji: "✨",
    description: "Setting & atmosphere"
  },

  Music: {
    emoji: "🎶",
    description: "Sound & energy"
  },

  Service: {
    emoji: "🤝",
    description: "Attention & hospitality"
  },

  Staff: {
    emoji: "👋",
    description: "Warmth & professionalism"
  },

  Vibe: {
    emoji: "🔥",
    description: "Energy & atmosphere"
  },

  Rooftop: {
    emoji: "🌃",
    description: "The view & setting"
  }

};


/* =========================================================
   APP STATE
   ========================================================= */

let selectedOptions = [];

let ratings = {};

let generatedReviewText = "";

let averageRating = 5;

let currentScreen = "experience";

let toastTimer = null;

let generationTimer = null;

let generationDelay = null;


/* =========================================================
   UTILITY
   ========================================================= */

function getElement(id) {

  return document.getElementById(id);

}


/* =========================================================
   SCREEN MANAGEMENT
   ========================================================= */

function showScreen(screenName) {

  const screens = [

    experienceScreen,
    ratingScreen,
    loadingScreen,
    reviewScreen,
    platformScreen

  ];


  screens.forEach(screen => {

    if (!screen) return;

    screen.classList.remove("active");

  });


  let target = null;


  if (screenName === "experience") {

    target = experienceScreen;

  }

  else if (screenName === "rating") {

    target = ratingScreen;

  }

  else if (screenName === "loading") {

    target = loadingScreen;

  }

  else if (screenName === "review") {

    target = reviewScreen;

  }

  else if (screenName === "platform") {

    target = platformScreen;

  }


  if (!target) return;


  target.classList.add("active");

  currentScreen = screenName;


  updateProgress(screenName);


  /*
   * Reset page scroll.
   */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =========================================================
   PROGRESS SYSTEM
   ========================================================= */

function updateProgress(screenName) {

  const step1 =
    getElement("step1");

  const step2 =
    getElement("step2");

  const step3 =
    getElement("step3");

  const step4 =
    getElement("step4");

  const progressActive =
    getElement("progressActive");


  const steps = [
    step1,
    step2,
    step3,
    step4
  ];


  steps.forEach(step => {

    if (!step) return;

    step.classList.remove(
      "active",
      "completed"
    );

  });


  if (screenName === "experience") {

    if (step1) {

      step1.classList.add(
        "active"
      );

    }

    if (progressActive) {

      progressActive.style.width =
        "0%";

    }

  }


  else if (screenName === "rating") {

    if (step1) {

      step1.classList.add(
        "completed"
      );

    }

    if (step2) {

      step2.classList.add(
        "active"
      );

    }

    if (progressActive) {

      progressActive.style.width =
        "33.33%";

    }

  }


  else if (
    screenName === "loading" ||
    screenName === "review"
  ) {

    if (step1) {

      step1.classList.add(
        "completed"
      );

    }

    if (step2) {

      step2.classList.add(
        "completed"
      );

    }

    if (step3) {

      step3.classList.add(
        "active"
      );

    }

    if (progressActive) {

      progressActive.style.width =
        "66.66%";

    }

  }


  else if (screenName === "platform") {

    if (step1) {

      step1.classList.add(
        "completed"
      );

    }

    if (step2) {

      step2.classList.add(
        "completed"
      );

    }

    if (step3) {

      step3.classList.add(
        "completed"
      );

    }

    if (step4) {

      step4.classList.add(
        "active"
      );

    }

    if (progressActive) {

      progressActive.style.width =
        "100%";

    }

  }

}


/* =========================================================
   EXPERIENCE CARD SETUP
   ========================================================= */

function setupExperienceCards() {

  /*
   * IMPORTANT:
   * We query the cards here instead of relying on
   * a possibly unavailable NodeList at script start.
   */

  const cards =
    document.querySelectorAll(
      ".experience-card"
    );


  if (!cards.length) {

    console.warn(
      "No .experience-card elements found."
    );

    return;

  }


  cards.forEach(card => {

    /*
     * Make sure the card is actually clickable.
     */

    card.style.cursor = "pointer";


    card.addEventListener(
      "click",
      handleExperienceCardClick
    );


    /*
     * Keyboard accessibility.
     */

    card.addEventListener(
      "keydown",
      event => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          handleExperienceCardClick.call(
            card,
            event
          );

        }

      }
    );

  });

}


/* =========================================================
   EXPERIENCE CARD CLICK
   ========================================================= */

function handleExperienceCardClick() {

  const card = this;


  if (!card) return;


  const option =
    card.dataset.option;


  if (!option) {

    console.warn(
      "Experience card is missing data-option:",
      card
    );

    return;

  }


  /*
   * Toggle selection.
   */

  const index =
    selectedOptions.indexOf(
      option
    );


  if (index !== -1) {

    /*
     * Already selected → remove.
     */

    selectedOptions.splice(
      index,
      1
    );


    card.classList.remove(
      "selected"
    );

  }

  else {

    /*
     * Not selected → add.
     */

    selectedOptions.push(
      option
    );


    card.classList.add(
      "selected"
    );

  }


  updateSelectionUI();

}


/* =========================================================
   SELECTION UI
   ========================================================= */

function updateSelectionUI() {

  const count =
    selectedOptions.length;


  if (selectedCount) {

    selectedCount.textContent =
      `${count} SELECTED`;

  }


  if (count === 0) {

    if (selectionText) {

      selectionText.textContent =
        "Select what stood out to you";

    }


    if (selectionStatus) {

      selectionStatus.classList.remove(
        "has-selection"
      );

    }


    if (experienceNext) {

      experienceNext.disabled =
        true;

    }


    return;

  }


  if (selectionStatus) {

    selectionStatus.classList.add(
      "has-selection"
    );

  }


  if (experienceNext) {

    experienceNext.disabled =
      false;

  }


  if (!selectionText) return;


  if (count === 1) {

    selectionText.textContent =
      "Great choice — continue when ready";

  }

  else if (count === 2) {

    selectionText.textContent =
      "Nice — two highlights selected";

  }

  else {

    selectionText.textContent =
      `${count} highlights selected`;

  }

}


/* =========================================================
   EXPERIENCE → RATING
   ========================================================= */

function handleExperienceNext() {

  if (
    selectedOptions.length === 0
  ) {

    showToast(
      "Select at least one highlight"
    );

    return;

  }


  buildRatingCards();

  showScreen(
    "rating"
  );

}


/* =========================================================
   INITIAL EVENT SETUP
   ========================================================= */

function setupInitialEvents() {

  setupExperienceCards();


  if (experienceNext) {

    experienceNext.addEventListener(
      "click",
      handleExperienceNext
    );

  }

}



/* =========================================================
   THE DOM — EXPERIENCE REVIEW SYSTEM
   CLEAN RENEWED JS — PART 2/3
   ========================================================= */


/* =========================================================
   BUILD RATING CARDS
   ========================================================= */

function buildRatingCards() {

  if (!experienceRatings) {

    console.warn(
      "experienceRatings element not found."
    );

    return;

  }


  experienceRatings.innerHTML = "";

  ratings = {};


  selectedOptions.forEach(option => {

    ratings[option] = 0;


    const data =
      optionData[option];


    if (!data) return;


    const card =
      document.createElement(
        "div"
      );


    card.className =
      "experience-rating-card";


    card.innerHTML = `

      <div class="experience-rating-top">

        <div class="experience-rating-name">

          <div class="experience-rating-emoji">
            ${data.emoji}
          </div>

          <div>

            <strong>
              ${escapeHTML(option)}
            </strong>

            <span>
              ${escapeHTML(data.description)}
            </span>

          </div>

        </div>


        <div
          class="experience-stars"
          data-option="${escapeHTML(option)}"
        >

          ${createStars()}

        </div>

      </div>


      <div
        class="experience-rating-caption"
        data-caption="${escapeHTML(option)}"
      >
        Tap a star to rate
      </div>

    `;


    experienceRatings.appendChild(
      card
    );


    const stars =
      card.querySelectorAll(
        ".experience-star"
      );


    stars.forEach(star => {

      star.addEventListener(
        "click",
        event => {

          event.preventDefault();

          event.stopPropagation();


          const value =
            Number(
              star.dataset.value
            );


          setRating(
            option,
            value,
            card,
            stars
          );

        }
      );

    });

  });


  updateCreateButton();

}


/* =========================================================
   CREATE FIVE STARS
   ========================================================= */

function createStars() {

  let html = "";


  for (
    let i = 1;
    i <= 5;
    i++
  ) {

    html += `

      <button
        type="button"
        class="experience-star"
        data-value="${i}"
        aria-label="${i} star"
      >
        ★
      </button>

    `;

  }


  return html;

}


/* =========================================================
   SET RATING
   ========================================================= */

function setRating(
  option,
  value,
  card,
  stars
) {

  value =
    Math.max(
      1,
      Math.min(
        5,
        Number(value)
      )
    );


  ratings[option] =
    value;


  stars.forEach(
    (star, index) => {

      const starValue =
        index + 1;


      star.classList.toggle(
        "selected",
        starValue <= value
      );

    }
  );


  card.classList.add(
    "has-rating"
  );


  const caption =
    card.querySelector(
      ".experience-rating-caption"
    );


  const captions = {

    1:
      "We'll frame this as a thoughtful experience.",

    2:
      "We'll keep the tone warm and constructive.",

    3:
      "A balanced experience worth sharing.",

    4:
      "A very enjoyable part of your visit.",

    5:
      "A standout part of your experience."

  };


  if (caption) {

    caption.textContent =
      captions[value];

  }


  updateCreateButton();

}


/* =========================================================
   CHECK ALL RATINGS
   ========================================================= */

function updateCreateButton() {

  if (!createReviewButton) return;


  const allRated =
    selectedOptions.length > 0 &&
    selectedOptions.every(
      option =>
        Number(
          ratings[option]
        ) >= 1
    );


  createReviewButton.disabled =
    !allRated;

}


/* =========================================================
   CREATE REVIEW BUTTON
   ========================================================= */

function setupCreateReviewButton() {

  if (!createReviewButton) return;


  createReviewButton.addEventListener(
    "click",
    handleCreateReview
  );

}


/* =========================================================
   HANDLE CREATE REVIEW
   ========================================================= */

function handleCreateReview() {

  const allRated =
    selectedOptions.length > 0 &&
    selectedOptions.every(
      option =>
        Number(
          ratings[option]
        ) >= 1
    );


  if (!allRated) {

    showToast(
      "Please rate every selected highlight"
    );

    return;

  }


  calculateAverageRating();


  showScreen(
    "loading"
  );


  startReviewGeneration();

}


/* =========================================================
   CALCULATE AVERAGE RATING
   ========================================================= */

function calculateAverageRating() {

  if (
    selectedOptions.length === 0
  ) {

    averageRating = 5;

    return;

  }


  let total = 0;


  selectedOptions.forEach(
    option => {

      total +=
        Number(
          ratings[option] || 0
        );

    }
  );


  averageRating =
    total /
    selectedOptions.length;


  /*
   * Safety clamp.
   */

  averageRating =
    Math.max(
      1,
      Math.min(
        5,
        averageRating
      )
    );

}


/* =========================================================
   LOADING / AI GENERATION
   ========================================================= */

function startReviewGeneration() {

  /*
   * Clear previous timers.
   */

  if (generationTimer) {

    clearInterval(
      generationTimer
    );

  }


  if (generationDelay) {

    clearTimeout(
      generationDelay
    );

  }


  let progress = 0;


  if (loadingProgress) {

    loadingProgress.style.width =
      "0%";

  }


  if (loadingPercent) {

    loadingPercent.textContent =
      "0%";

  }


  const messages = [

    "Understanding your experience...",

    "Picking up the details...",

    "Finding the right words...",

    "Adding your personal highlights...",

    "Polishing your review...",

    "Almost ready..."

  ];


  let messageIndex = 0;


  if (loadingMessage) {

    loadingMessage.textContent =
      messages[0];

  }


  generationTimer =
    setInterval(
      () => {

        progress +=
          Math.floor(
            Math.random() * 8
          ) + 7;


        if (progress >= 100) {

          progress = 100;

        }


        if (loadingProgress) {

          loadingProgress.style.width =
            `${progress}%`;

        }


        if (loadingPercent) {

          loadingPercent.textContent =
            `${progress}%`;

        }


        const nextMessageIndex =
          Math.min(
            Math.floor(
              progress / 17
            ),
            messages.length - 1
          );


        if (
          nextMessageIndex !==
          messageIndex
        ) {

          messageIndex =
            nextMessageIndex;


          if (loadingMessage) {

            loadingMessage.textContent =
              messages[messageIndex];

          }

        }


        if (progress >= 100) {

          clearInterval(
            generationTimer
          );


          generationTimer =
            null;


          if (loadingProgress) {

            loadingProgress.style.width =
              "100%";

          }


          if (loadingPercent) {

            loadingPercent.textContent =
              "100%";

          }


          if (loadingMessage) {

            loadingMessage.textContent =
              "Your review is ready ✨";

          }


          generationDelay =
            setTimeout(
              () => {

                generationDelay =
                  null;


                try {

                  generatedReviewText =
                    generateReview();


                  renderReview();


                  showScreen(
                    "review"
                  );

                }

                catch (error) {

                  console.error(
                    "Review generation error:",
                    error
                  );


                  showToast(
                    "Something went wrong. Please try again."
                  );


                  showScreen(
                    "rating"
                  );

                }

              },
              550
            );

        }

      },
      190
    );

}


/* =========================================================
   REVIEW GENERATOR
   ========================================================= */

function generateReview() {

  const rating =
    Math.round(
      averageRating
    );


  const parts = [];


  function pick(array) {

    return array[
      Math.floor(
        Math.random() *
        array.length
      )
    ];

  }


  function shuffle(array) {

    return [...array].sort(
      () =>
        Math.random() - 0.5
    );

  }


  const sentences = {

    Food: {

      low: [
        "The food has potential, but the taste and execution could be improved.",
        "The food could be more consistent in flavour and overall preparation.",
        "Food quality was one of the areas that could use more attention."
      ],

      mid: [
        "The food is decent, although there is some room for improvement.",
        "The food is fairly good, with a few areas that could be more consistent.",
        "The food offering is enjoyable overall, although it could be refined further."
      ],

      high: [
        "The food is well presented and genuinely enjoyable.",
        "The food quality is quite good, with nice attention to presentation and flavour.",
        "The food is one of the stronger parts of the overall experience."
      ],

      best: [
        "The food is excellent, with great presentation and flavour.",
        "The food stands out with its presentation, quality and flavours.",
        "The food is particularly impressive and adds a lot to the overall experience."
      ]

    },


    Drinks: {

      low: [
        "The drinks could use some improvement in quality and consistency.",
        "The drinks look appealing, although the overall execution could be better."
      ],

      mid: [
        "The drinks are enjoyable, although there is room for refinement.",
        "The drinks complement the experience reasonably well.",
        "The drinks are decent and offer a good starting point for improvement."
      ],

      high: [
        "The drinks complement the overall experience nicely.",
        "The drinks are well presented and add a nice touch to the experience.",
        "The beverage selection is quite enjoyable."
      ],

      best: [
        "The drinks are excellent and complement the overall offering perfectly.",
        "The drinks are particularly well presented and enjoyable."
      ]

    },


    Ambience: {

      low: [
        "The ambience has a good concept, but the overall atmosphere could be more polished.",
        "The ambience has potential, although some details could be improved."
      ],

      mid: [
        "The ambience is pleasant and has a nice overall character.",
        "The atmosphere is enjoyable, although it could be made a little more engaging."
      ],

      high: [
        "The ambience feels warm, stylish and inviting.",
        "The atmosphere is comfortable and nicely put together.",
        "The ambience adds a lot of character to THE DOM."
      ],

      best: [
        "The ambience is beautiful, relaxed and extremely inviting.",
        "The atmosphere is one of the standout aspects of THE DOM.",
        "The ambience is thoughtfully designed and creates a memorable setting."
      ]

    },


    Music: {

      low: [
        "The music selection could be better balanced with the overall atmosphere.",
        "The music has potential, although the volume and selection could be improved."
      ],

      mid: [
        "The music works reasonably well with the atmosphere.",
        "The music adds some character to the overall setting.",
        "The music fits the space fairly well."
      ],

      high: [
        "The music fits the overall atmosphere nicely.",
        "The music complements the setting and keeps the atmosphere lively."
      ],

      best: [
        "The music complements the atmosphere perfectly.",
        "The music selection is excellent and really adds to the setting."
      ]

    },


    Service: {

      low: [
        "The service could be more attentive and consistent.",
        "The service needs a little more attention to timing and responsiveness."
      ],

      mid: [
        "The service is satisfactory, although a little more attentiveness would help.",
        "The service was reasonably good, with some room for improvement.",
        "The service was decent but could be a little more consistent."
      ],

      high: [
        "The service feels attentive and professional.",
        "The service is smooth, polite and well managed.",
        "The service adds positively to the overall experience."
      ],

      best: [
        "The service is attentive, smooth and genuinely professional.",
        "The service stands out for being quick, attentive and courteous."
      ]

    },


    Staff: {

      low: [
        "The staff are courteous, although a little more attentiveness would help.",
        "The staff are polite, but the overall attentiveness could be improved."
      ],

      mid: [
        "The staff are polite and welcoming.",
        "The staff are courteous and reasonably attentive.",
        "The staff interaction is pleasant overall."
      ],

      high: [
        "The staff come across as friendly and welcoming.",
        "The staff are courteous, attentive and professional.",
        "The staff add a warm touch to the overall experience."
      ],

      best: [
        "The staff are warm, courteous and genuinely welcoming.",
        "The staff are particularly attentive and professional."
      ]

    },


    Vibe: {

      low: [
        "The overall vibe has potential, but the experience could come together better.",
        "The concept is interesting, although the overall vibe could be more consistent."
      ],

      mid: [
        "The overall vibe is enjoyable, although it could be made more consistent.",
        "The vibe is pleasant and has a good amount of character."
      ],

      high: [
        "The overall vibe is stylish, energetic and enjoyable.",
        "The vibe is lively without feeling overwhelming.",
        "The overall energy of THE DOM is quite appealing."
      ],

      best: [
        "The overall vibe is stylish, energetic and memorable.",
        "THE DOM has a fantastic vibe that really stands out.",
        "The atmosphere and overall energy are exceptionally well balanced."
      ]

    },


    Rooftop: {

      low: [
        "The rooftop setting has potential, although the overall experience could be improved.",
        "The rooftop is an interesting feature, but some aspects could be more polished."
      ],

      mid: [
        "The rooftop setting is a nice feature of THE DOM.",
        "The rooftop adds an interesting element to the overall experience."
      ],

      high: [
        "The rooftop setting is one of the more appealing aspects of THE DOM.",
        "The rooftop atmosphere is quite enjoyable and adds character to the place."
      ],

      best: [
        "The rooftop setting and views are particularly impressive.",
        "The rooftop is one of the standout features of THE DOM.",
        "The rooftop setting creates a beautiful and memorable atmosphere."
      ]

    }

  };


  selectedOptions.forEach(
    option => {

      if (
        !sentences[option]
      ) return;


      const optionRating =
        Number(
          ratings[option]
        );


      let level;


      if (optionRating <= 2) {

        level = "low";

      }

      else if (optionRating === 3) {

        level = "mid";

      }

      else if (optionRating === 4) {

        level = "high";

      }

      else {

        level = "best";

      }


      parts.push(
        pick(
          sentences[option][level]
        )
      );

    }
  );


  return buildFinalReview(
    rating,
    parts,
    pick,
    shuffle
  );

}

/* =========================================================
   THE DOM — EXPERIENCE REVIEW SYSTEM
   CLEAN RENEWED JS — PART 3/3
   ========================================================= */


/* =========================================================
   BUILD FINAL REVIEW
   ========================================================= */

function buildFinalReview(
  rating,
  parts,
  pick,
  shuffle
) {

  let opening = "";

  let closing = "";


  /* =======================================================
     OPENING
     ======================================================= */

  if (rating <= 2) {

    opening = pick([

      "THE DOM has an interesting concept.",

      "There is definitely some potential in THE DOM.",

      "THE DOM has some good ideas, although a few areas need attention.",

      "The concept at THE DOM is interesting, but there is room to improve."

    ]);

  }

  else if (rating === 3) {

    opening = pick([

      "THE DOM has a pleasant overall concept.",

      "THE DOM offers a fairly enjoyable experience overall.",

      "There are some nice elements to THE DOM.",

      "THE DOM has a good concept with room for further refinement."

    ]);

  }

  else if (rating === 4) {

    opening = pick([

      "THE DOM has a really nice overall vibe.",

      "THE DOM has a stylish and enjoyable atmosphere.",

      "There is a lot to like about THE DOM.",

      "THE DOM has several strong elements that work well together."

    ]);

  }

  else {

    opening = pick([

      "THE DOM has a fantastic overall vibe.",

      "THE DOM really stands out for its atmosphere and presentation.",

      "There is a lot to appreciate about THE DOM.",

      "THE DOM has a beautifully put-together overall experience."

    ]);

  }


  /* =======================================================
     CLOSING
     ======================================================= */

  if (rating <= 2) {

    closing = pick([

      "Overall, there is room for improvement and hopefully these details will be refined further.",

      "A little more attention to consistency and execution could make a noticeable difference.",

      "The concept has potential, but some improvements would make the overall offering stronger."

    ]);

  }

  else if (rating === 3) {

    closing = pick([

      "Overall, there are some good elements here with a little room for improvement.",

      "A little more attention to detail could make the overall experience even better.",

      "With some refinement, the overall offering could become even stronger."

    ]);

  }

  else if (rating === 4) {

    closing = pick([

      "Overall, a very good experience with just a few small details that could be refined.",

      "A strong overall offering with only minor areas that could be improved.",

      "Overall, a really enjoyable concept that could become even better with a few refinements."

    ]);

  }

  else {

    closing = pick([

      "Overall, the combination of atmosphere, presentation and attention to detail makes it stand out.",

      "Overall, the different elements come together beautifully.",

      "The attention to atmosphere and presentation makes THE DOM particularly memorable."

    ]);

  }


  /* =======================================================
     FINAL TEXT
     ======================================================= */

  const shuffledParts =
    shuffle(parts);


  return [

    opening,

    ...shuffledParts,

    closing

  ]

    .join(" ")

    .replace(/\s+/g, " ")

    .trim();

}


/* =========================================================
   RENDER REVIEW
   ========================================================= */

function renderReview() {

  if (generatedReview) {

    generatedReview.textContent =
      generatedReviewText;

  }


  renderReviewStars();

}


/* =========================================================
   REVIEW STARS
   ========================================================= */

function renderReviewStars() {

  if (!reviewStars) return;


  const rounded =
    Math.max(
      1,
      Math.min(
        5,
        Math.round(
          averageRating
        )
      )
    );


  let html = "";


  for (
    let i = 1;
    i <= 5;
    i++
  ) {

    html +=
      i <= rounded
        ? "★"
        : "☆";

  }


  reviewStars.textContent =
    html;

}


/* =========================================================
   COPY REVIEW
   ========================================================= */

function setupCopyButton() {

  if (!copyReviewButton) return;


  copyReviewButton.addEventListener(
    "click",
    async () => {

      if (
        !generatedReviewText
      ) {

        showToast(
          "Your review isn't ready yet"
        );

        return;

      }


      const success =
        await copyToClipboard(
          generatedReviewText
        );


      if (!success) {

        showToast(
          "Please copy the review manually"
        );

        return;

      }


      if (copyMessage) {

        copyMessage.classList.add(
          "show"
        );

      }


      copyReviewButton.classList.add(
        "copied"
      );


      setTimeout(
        () => {

          showScreen(
            "platform"
          );

        },
        500
      );

    }
  );

}


/* =========================================================
   CLIPBOARD
   ========================================================= */

async function copyToClipboard(
  text
) {

  try {

    /*
     * Modern browsers.
     */

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        text
      );

      return true;

    }


    /*
     * Fallback.
     */

    const textarea =
      document.createElement(
        "textarea"
      );


    textarea.value =
      text;


    textarea.setAttribute(
      "readonly",
      ""
    );


    textarea.style.position =
      "fixed";

    textarea.style.left =
      "-9999px";

    textarea.style.top =
      "0";

    textarea.style.opacity =
      "0";


    document.body.appendChild(
      textarea
    );


    textarea.focus();

    textarea.select();

    textarea.setSelectionRange(
      0,
      textarea.value.length
    );


    const copied =
      document.execCommand(
        "copy"
      );


    textarea.remove();


    return copied;

  }

  catch (error) {

    console.error(
      "Clipboard error:",
      error
    );


    return false;

  }

}


/* =========================================================
   PLATFORM BUTTON SETUP
   ========================================================= */

function setupPlatformButton(
  buttonId,
  platform
) {

  const button =
    document.getElementById(
      buttonId
    );


  if (!button) return;


  button.addEventListener(
    "click",
    () => {

      const link =
        PLATFORM_LINKS[platform];


      if (
        !link ||
        link.includes(
          "PASTE_YOUR_"
        )
      ) {

        showToast(
          `Add your ${platform} link in script.js`
        );

        return;

      }


      /*
       * Small tap animation.
       */

      button.style.transform =
        "scale(.97)";


      button.style.pointerEvents =
        "none";


      setTimeout(
        () => {

          button.style.transform =
            "";

          button.style.pointerEvents =
            "";


          window.location.href =
            link;

        },
        140
      );

    }
  );

}


/* =========================================================
   PLATFORM BUTTONS
   ========================================================= */

function setupPlatformButtons() {

  setupPlatformButton(
    "swiggyButton",
    "swiggy"
  );


  setupPlatformButton(
    "zomatoButton",
    "zomato"
  );


  setupPlatformButton(
    "districtButton",
    "district"
  );


  setupPlatformButton(
    "googleButton",
    "google"
  );


  setupPlatformButton(
    "instagramButton",
    "instagram"
  );


  setupPlatformButton(
    "facebookButton",
    "facebook"
  );

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(
  message
) {

  if (
    !toast ||
    !toastText
  ) return;


  toastText.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      2600
    );

}


/* =========================================================
   RESET EXPERIENCE
   ========================================================= */

function resetExperience() {

  /*
   * Stop generation if active.
   */

  if (generationTimer) {

    clearInterval(
      generationTimer
    );

    generationTimer =
      null;

  }


  if (generationDelay) {

    clearTimeout(
      generationDelay
    );

    generationDelay =
      null;

  }


  selectedOptions = [];

  ratings = {};

  generatedReviewText = "";

  averageRating = 5;

  currentScreen =
    "experience";


  /*
   * Remove selected cards.
   */

  document
    .querySelectorAll(
      ".experience-card.selected"
    )
    .forEach(card => {

      card.classList.remove(
        "selected"
      );

    });


  /*
   * Reset review.
   */

  if (generatedReview) {

    generatedReview.textContent =
      "";

  }


  /*
   * Reset copy state.
   */

  if (copyMessage) {

    copyMessage.classList.remove(
      "show"
    );

  }


  if (copyReviewButton) {

    copyReviewButton.classList.remove(
      "copied"
    );

  }


  /*
   * Reset loader.
   */

  if (loadingProgress) {

    loadingProgress.style.width =
      "0%";

  }


  if (loadingPercent) {

    loadingPercent.textContent =
      "0%";

  }


  if (loadingMessage) {

    loadingMessage.textContent =
      "Understanding your experience...";

  }


  /*
   * Return to first screen.
   */

  updateSelectionUI();

  showScreen(
    "experience"
  );

}


/* =========================================================
   KEYBOARD ACCESSIBILITY
   ========================================================= */

function setupKeyboardControls() {

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "Escape" &&
        currentScreen !== "experience"
      ) {

        resetExperience();

      }

    }
  );

}


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHTML(
  value
) {

  return String(value)

    .replace(
      /&/g,
      "&amp;"
    )

    .replace(
      /</g,
      "&lt;"
    )

    .replace(
      />/g,
      "&gt;"
    )

    .replace(
      /"/g,
      "&quot;"
    )

    .replace(
      /'/g,
      "&#039;"
    );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

function initialize() {

  /*
   * Reset state.
   */

  selectedOptions = [];

  ratings = {};

  generatedReviewText = "";

  averageRating = 5;

  currentScreen =
    "experience";


  /*
   * Hide every screen first.
   */

  [

    experienceScreen,

    ratingScreen,

    loadingScreen,

    reviewScreen,

    platformScreen

  ].forEach(screen => {

    if (!screen) return;

    screen.classList.remove(
      "active"
    );

  });


  /*
   * Show first screen.
   */

  if (experienceScreen) {

    experienceScreen.classList.add(
      "active"
    );

  }


  /*
   * Setup everything.
   */

  setupInitialEvents();

  setupCreateReviewButton();

  setupCopyButton();

  setupPlatformButtons();

  setupKeyboardControls();


  /*
   * Initial UI.
   */

  updateSelectionUI();

  updateProgress(
    "experience"
  );

}


/* =========================================================
   START
   ========================================================= */

if (
  document.readyState === "loading"
) {

  document.addEventListener(
    "DOMContentLoaded",
    initialize
  );

}

else {

  initialize();

}
