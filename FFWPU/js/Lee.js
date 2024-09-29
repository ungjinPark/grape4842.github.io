// 현재 폰트 크기 표시를 업데이트하는 함수
function updateFontSizeDisplay() {
    const content = document.getElementById('main_content');
    const computedStyle = window.getComputedStyle(content);
    const currentSize = parseFloat(computedStyle.fontSize) / parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    document.getElementById('font_size_display').value = currentSize.toFixed(1) + 'rem';

    // 폰트 크기가 최소값인지 확인하고 버튼 상태 업데이트
    updateButtonState(currentSize);
}

// 폰트 크기를 변경하는 함수
function changeFontSize(action, event) {
    event.stopPropagation();
    const content = document.getElementById('main_content');
    let currentSize = parseFloat(window.getComputedStyle(content).fontSize) / parseFloat(window.getComputedStyle(document.documentElement).fontSize);
    let currentLineHeight = parseFloat(window.getComputedStyle(content).lineHeight) / parseFloat(window.getComputedStyle(document.documentElement).fontSize);

    if (action === 'increase') {
        currentSize += 0.1; // 0.1rem 증가
        if (Math.floor(currentSize * 10) % 3 === 0) { // 0.3rem 단위로 증가할 때
            currentLineHeight += 0.1; // 0.1rem 증가
        }
    } else if (action === 'decrease') {
        currentSize -= 0.1; // 0.1rem 감소
        if (Math.floor(currentSize * 10) % 3 === 0) { // 0.3rem 단위로 감소할 때
            currentLineHeight -= 0.1; // 0.1rem 감소
        }
    }

    // 폰트 크기가 0.5rem보다 작아지지 않도록 설정
    if (currentSize < 0.5) {
        currentSize = 0.5;
    }

    // line-height가 특정 폰트에 맞게 선언되어 있지 않은 경우에만 조정
    if (!content.style.lineHeight || parseFloat(content.style.lineHeight) < currentSize * 1.8) {
        // line-height가 font-size * 1.8보다 작을 경우, line-height를 증가
        if (currentLineHeight < currentSize * 1.8) {
            currentLineHeight = currentSize * 1.8;
        }

        // line-height가 font-size * 2.5보다 클 경우, line-height를 감소
        if (currentLineHeight > currentSize * 2.5) {
            currentLineHeight = currentSize * 1.8;
        }

        content.style.lineHeight = currentLineHeight + 'rem';
    }

    content.style.fontSize = currentSize + 'rem';
    updateFontSizeDisplay();
}

// 폰트 크기를 1rem으로 설정하는 함수
function setFontSizeTo1rem(event) {
    event.stopPropagation();
    const content = document.getElementById('main_content');
    content.style.fontSize = '1rem';
    content.style.lineHeight = '1.8rem'; // 폰트 크기의 1.8배로 설정
    updateFontSizeDisplay();
}

// 폰트 크기를 초기화하는 함수
function resetFontSize(event) {
    event.stopPropagation();
    const content = document.getElementById('main_content');
    content.style.fontSize = ''; // 초기값으로 설정
    content.style.lineHeight = ''; // 초기값으로 설정
    updateFontSizeDisplay();
}

// 버튼 상태를 업데이트하는 함수
function updateButtonState(currentSize) {
    const decreaseButton = document.getElementById('decrease_font_button');
    const minFontSizeLabel = document.getElementById('min_font_size_label');
    if (currentSize <= 0.5) {
        decreaseButton.disabled = true; // 버튼 비활성화
        decreaseButton.setAttribute('aria-disabled', 'true'); // 스크린 리더용 속성 추가
        minFontSizeLabel.style.display = 'inline'; // 최소값 레이블 표시
    } else {
        decreaseButton.disabled = false; // 버튼 활성화
        decreaseButton.setAttribute('aria-disabled', 'false'); // 스크린 리더용 속성 제거
        minFontSizeLabel.style.display = 'none'; // 최소값 레이블 숨김
    }
}

// 폰트 스타일을 변경하는 함수
function changeFont(font, event) {
    event.stopPropagation(); // 이벤트 전파 중지
    const content = document.getElementById('main_content');
    content.style.fontFamily = font; // 폰트 스타일 변경

    const radios = document.querySelectorAll('.font_family input[type="radio"]');
    radios.forEach(radio => {
        radio.checked = radio.value === font; // 선택된 폰트 라디오 버튼 체크
    });
}

// 폰트 크기 표시를 업데이트하는 함수
function updateFontSizeDisplay() {
    // 폰트 크기 표시 업데이트 로직
}

window.addEventListener('resize', updateFontSizeDisplay); // 창 크기 조정 시 폰트 크기 표시 업데이트
document.addEventListener('DOMContentLoaded', updateFontSizeDisplay); // DOM 로드 완료 시 폰트 크기 표시 업데이트

// 아코디언 메뉴를 토글하는 함수
function toggleAccordion() {
    const button = document.querySelector('.font_control.accordion-button');
    const panel = document.getElementById('font_panel');

    // 아코디언 패널의 최대 높이를 설정하여 부드럽게 열리고 닫히도록 함
    if (panel.style.maxHeight) {
        panel.style.maxHeight = null; // 패널 닫기
        button.setAttribute('aria-expanded', 'false'); // aria-expanded 속성 업데이트
        panel.setAttribute('aria-hidden', 'true'); // aria-hidden 속성 업데이트
    } else {
        panel.style.maxHeight = panel.scrollHeight + 'px'; // 패널 열기
        button.setAttribute('aria-expanded', 'true'); // aria-expanded 속성 업데이트
        panel.setAttribute('aria-hidden', 'false'); // aria-hidden 속성 업데이트
    }
}

<<<<<<< HEAD
// 아코디언 버튼 클릭 시 아코디언 메뉴 토글
document.querySelector('.font_control.accordion-button').addEventListener('click', toggleAccordion);
=======
// 키보드 접근성을 위한 함수
function handleKeyPress(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // 기본 동작을 막음
        toggleAccordion(event); // 아코디언 메뉴를 토글
    }
}

// 이벤트 리스너 추가
document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', toggleAccordion);
    button.addEventListener('keypress', handleKeyPress);
});


// 링크 요소 가져오기
let myLink = document.getElementById("go_top");

// 사용자가 페이지를 스크롤할 때 실행되는 함수
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    // 페이지가 10% 이상 스크롤되었는지 확인
    if (document.body.scrollTop > document.documentElement.scrollHeight * 0.1 || 
        document.documentElement.scrollTop > document.documentElement.scrollHeight * 0.1) {
        myLink.style.display = "block";
        myLink.style.opacity = "1"; // 투명도 변경
    } else {
        myLink.style.opacity = "0"; // 투명도 변경
        setTimeout(function() {
            myLink.style.display = "none";
        }, 500); // 전환 효과 시간과 일치시킴
    }
}





let isPlaying = false; // 재생 상태를 추적하는 변수
let speech = new SpeechSynthesisUtterance(); // SpeechSynthesisUtterance 객체를 저장할 변수
speech.lang = 'ja-JP'; // 언어 설정 (일본어)

// main 요소의 내용을 읽어주는 함수
function readMainContent() {
    const mainContentElement = document.querySelector('#main_content');
    const mainContent = Array.from(mainContentElement.childNodes)
        .filter(node => !(node.nodeType === Node.ELEMENT_NODE && node.getAttribute('aria-hidden') === 'true'))
        .map(node => node.textContent)
        .join(' '); // aria-hidden이 true인 요소를 제외한 텍스트 내용 가져오기

    console.log('Main content:', mainContent); // 콘솔에 메인 콘텐츠 출력
    speech.text = mainContent; // 텍스트 업데이트
    console.log('Speech text:', speech.text); // 콘솔에 음성 텍스트 출력

    const contentReaderButton = document.querySelector('#content_reader');

    if (isPlaying) {
        window.speechSynthesis.pause(); // 음성 일시정지
        contentReaderButton.classList.remove('voice'); // voice 클래스 제거
        isPlaying = false;
    } else {
        if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume(); // 음성 재개
        } else {
            window.speechSynthesis.speak(speech); // 음성 재생
        }
        contentReaderButton.classList.add('voice'); // voice 클래스 추가
        isPlaying = true;
    }
}

// 버튼 클릭 시 main 내용을 읽어주는 이벤트 리스너 추가
document.querySelector('#content_reader').addEventListener('click', readMainContent);
>>>>>>> parent of 1f85f86 (font setting)
