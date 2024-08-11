const scrollable = document.querySelector('.scrollable')
const content = document.querySelector('.content')
const imgSections = [...document.querySelectorAll('.img-section')]
const images = [...document.querySelectorAll('.img')]

images.forEach((image, idx) => {
    image.style.backgroundImage = `url(./images/${idx+1}.jpeg)`
})

let isMobile = false 
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}
if(!isMobile){ // web
    imgSections.forEach(section => {
        let clonedSection = section.cloneNode(true) // section 복제
        clonedSection.classList.add('clone')
        content.appendChild(clonedSection) // content 요소안에 복제된 섹션 추가
    })
}

const wraps = [...document.querySelectorAll('.wrap')]
const menuTog = document.querySelector('.menu-tog')
const menu = document.querySelector('.menu')
const menuWraps = [...document.querySelectorAll('.menu-wrap')]

// set scroll dimensions
function init(){
    document.body.style.height = `${content.getBoundingClientRect().height}px` // 컨텐츠 크기만큼 스크롤바 생성
}
function displayWraps(){
    wraps.forEach((wrap, idx) => {
        setTimeout(() => {
            wrap.classList.add('active')
        }, (idx+1) * 50) // 50ms 간격으로 순차적으로 요소 보여주기
    })
}
function toggleMenu(){ // 핵심적인 코드 
    if(menu.classList.contains('active')){
        menuTog.classList.remove('active')
        toggleMenuWraps(false) // 좌측하단 메뉴 숨기기
        setTimeout(() => { // 메뉴가 사라지는데 0.5초정도 걸리므로 그 이후에 메뉴 비활성화하기
            menu.classList.remove('active')
        }, 500)
        setTimeout(() => {
            toggleWraps(true) // 이미지 + 이미지 정보 보여주기 
        }, 500)
    }else{
        menuTog.classList.add('active')
        toggleWraps(false) // 이미지 + 이미지 정보 숨기기
        setTimeout(() => { // 이미지 + 이미지 정보가 사라지는데 0.5초정도 걸리므로 그 이후에 메뉴 비활성화하기
            menu.classList.add('active')
        }, 500)
        setTimeout(() => {
            toggleMenuWraps(true) // 좌측하단 메뉴 보여주기
        }, 500)
    }
}
function toggleWraps(active){
    wraps.forEach(wrap => {
        toggleWrap(wrap, active)
    })
}
function toggleMenuWraps(active){
    menuWraps.forEach(wrap => {
        toggleWrap(wrap, active)
    })
}
function toggleWrap(wrap, active){
    setTimeout(() => {
        if(active){
            wrap.classList.add('active')
        }else{
            wrap.classList.remove('active')
        }
    })
}

window.addEventListener('resize', init) // 브라우저창 사이즈 변경시 컨텐츠 크기 다시 계산해서 스크롤바 길이 적용
menuTog.addEventListener('click', toggleMenu)

let target = 1
let reverse = false 

function scroll(){ // 핵심적인 코드
    target = window.scrollY // 스크롤 위치
    console.log(target, content.offsetHeight / 2)
    if(!isMobile){
        if(target <= 0){ // 거꾸로 스크롤할때 (스크롤을 올리는 경우) 필요함
            target = (content.offsetHeight / 2) - 1
            window.scrollTo(0, target) // 스크롤 위치를 원본의 마지막 7번째 섹션으로 이동해서 거꾸로 섹션을 볼 수 있음
        }else if(target >= content.offsetHeight / 2){ // 스크롤을 내리는 경우 처음 섹션부터 시작해서 원본섹션 7개가 브라우저에서 사라지는 순간
            target = 1
            window.scrollTo(0, target) // 스크롤 위치 초기화해서 다시 처음 섹션부터 볼 수 있도록 함 (무한스크롤처럼 보임)
        }
    }
    if(reverse){
        target--
    }else{
        target++
    }
    scrollable.style.transform = `translateY(${-target}px)` // 이미지가 스크롤되면서 위로 올라가도록 함
    requestAnimationFrame(scroll)
}

init()
displayWraps() // 맨 처음에 이미지 + 이미지정보 보여주기 

document.addEventListener('click', () => {
    reverse = !reverse
})
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { // setTimeout 부분은 없어도 잘 동작함
        window.scrollTo(0, 1)
    }, 200)
    scroll()
})