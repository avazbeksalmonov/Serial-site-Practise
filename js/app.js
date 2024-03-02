window.addEventListener("DOMContentLoaded", () => {
    const tabsParent = document.querySelector(".tabheader__items"),
        tabs = document.querySelectorAll(".tabheader__item"),
        tabsContent = document.querySelectorAll(".tabcontent"),
        loader = document.querySelector(".loader");
    //TAB
    // 2ta funksiya yozamiz
    //Birinchisi tablarimizni yashirib turadi o'chirib
    //Ikkinchisi tablarimizni ko'rsatib turadi
    // 1- hidetabContent() funksiyasi Yashirib turish uchun tablarni
    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add("hide");
            item.classList.remove("show");
        });
        tabs.forEach((item) => {
            item.classList.remove("tabheader__item_active");
        });
    }

    // 2-showtabContent() funksiyasi Ko'rsatish uchun tablarni
    function showTabContent(i = 0) {
        tabsContent[i].classList.add("show");
        tabsContent[i].classList.remove("hide");
        tabs[i].classList.add("tabheader__item_active");
    }
    hideTabContent();
    showTabContent();
    tabsParent.addEventListener("click", (e) => {
        const target = e.target;

        if (target && target.classList.contains("tabheader__item")) {
            tabs.forEach((item, idx) => {
                if (target === item) {
                    hideTabContent();
                    showTabContent(idx);
                }
            });
        }
    });
    // Tab tugashi
    // Timer boshlanishi

    const deadline = "2024-10-1";

    function getTimeRemaining(endtime) {
        let days, hours, minutes, seconds;
        const timer = Date.parse(endtime) - Date.parse(new Date());

        if (timer <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(timer / (1000 * 60 * 60 * 24));
            hours = Math.floor((timer / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((timer / 1000 / 60) % 60);
            seconds = Math.floor((timer / 1000) % 60);
        }

        return { timer, days, hours, minutes, seconds };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector("#hours"),
            minutes = timer.querySelector("#minutes"),
            seconds = timer.querySelector("#seconds"),
            timeInterval = setInterval(updatClock, 1000);

        updatClock();

        function updatClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.timer <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(".timer", deadline);
    // Timer tugashi
    // Loader boshlanishi
    setTimeout(() => {
        loader.style.opacity = "0";
        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    }, 2000);
    //Loader tugashi

    // Modal boshlanishi

    const modalTrigger = document.querySelectorAll("[data-modal]");
    const modal = document.querySelector(".modal");
    const modalCloseBtn = document.querySelector("[data-close]");

    function closeModal() {
        modal.classList.add("hide");
        modal.classList.remove("show");
        document.body.style.overflow = "";
    }

    function openModal() {
        modal.classList.add("show");
        modal.classList.remove("hide");
        //modal ochilgandan keyin scroll chiqmasligi uchun
        document.body.style.overflow = "hidden";
        clearInterval(modalTimerId);
    }
    modalTrigger.forEach((item) => {
        item.addEventListener("click", openModal);
    });

    modalCloseBtn.addEventListener("click", closeModal);
    //Modaldan boshqa joyga bosganda close qilish
    modal.addEventListener("click", (e) => {
        if (e.target == modal) {
            closeModal();
        }
    });
    //Escape orqali o'chirish
    document.addEventListener("keydown", (e) => {
        if (e.code === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });
    //Backspace orqali
    document.addEventListener("keydown", (e) => {
        if (e.code === "Backspace" && modal.classList.contains("show")) {
            closeModal();
        }
    });
    // Saytga kirgandan keyin 5 seconddan keyin modalni userga ko'rsatish
    const modalTimerId = setTimeout(openModal, 5000);
    // Footerga kelganda modalni ko'rsatish
    function showModalScroll() {
        if (
            window.pageYOffset + document.documentElement.clientHeight >=
            document.documentElement.scrollHeight - 1
        ) {
            openModal();
            //Bir marta ishlaydi funksiya
            window.removeEventListener("scroll", showModalScroll);
        }
    }
    window.addEventListener("scroll", showModalScroll);

    // Modal tugashi
});