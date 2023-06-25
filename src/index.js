// TODO: 이 곳에 정답 코드를 작성해주세요.
// 1. 페이지가 로드 되었을때, ID입력창에 Focusing 되어있어야함.
// 대상: ID 입력창
// 시점: 페이지 로드 되었을 때
// 이벤트: focus()

// $붙히는 이유 => 코드를 읽는 사람이 이거는 Dom을 가져온것이라 말함
const $id = document.getElementById('id')
const $idMsg = document.getElementById('id-msg')
// console.log($id)

// 윈도우가 로드되었을때 이벤트 시작
// $id에 포커스
window.addEventListener('load', () => {
    $id.focus()
})
// HTML input => autofocus 속성 추가 !
/* <input autofocus /> */

// 2 유효성 로직 검사 !
// 대상 : ID, 비밀번호, 비밀번호 확인
// 이벤트: (1) input focus out (2) 가입하기 버튼을 눌렀을 때
// 핸들러: (1) 해당 input의 유효성 (2) 모든 필드의 유효성 검사

const $pw = document.getElementById('pw')
const $pwMsg = document.getElementById('pw-msg')
const $pwCheck = document.getElementById('pw-check')
const $pwCheckMsg = document.getElementById('pw-check-msg')
// 가입하기 버튼
const $submit = document.getElementById('submit')
// id 핸들러
const ID_REGEX = new RegExp('^[a-zA-Z0-9_-]{5,20}$')
const PW_REGEX = new RegExp('^[a-zA-Z0-9]{8,16}$')

// 아이디 확인
const ID_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '5~20자의 영문 소문자, 숫자와 특수기호(-)(_)만 사용 가능합니다.',
}

const checkIdValiation = (value) => {
    // 유효성 검사 패턴
    // 모든 필드의 값은 빠짐 없이 입력해야 합니다.
    // ID: 5~20자, 영문 소문자,대문자, 숫자, 특수문자(-), (_)만 사용 가능
    const isValideId = ID_REGEX.test(value)

    // 커스텀 에러 메세지
    // (1) 비어 있을때 (2) 유효하지 않은 값일때
    // input 태크에 border-red-600 class 추가 & **-msg에 에러 메세지 추가
    let isValidId
    if (value.length === 0) {
        isValidId = 'required'
    } else {
        isValidId = ID_REGEX.test(value) ? true : 'invalid'
    }

    if (isValidId !== true) {
        // isValidId 가 required 일 때
        $id.classList.add('border-red-600')
        $idMsg.innerText = ID_ERROR_MSG[isValidId]
    } else {
        $id.classList.remove('border-red-600')
        $idMsg.innerText = ''
    }
}
$id.addEventListener('focusout', () => checkIdValiation($id.value))

// 패스워드 확인
const pw_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '8~16자, 영문 소문자,대문자, 숫자 만 사용 가능합니다.',
}
const checkPwvaliation = (value) => {
    // 유효성 검사 패턴
    // 모든 필드의 값은 빠짐 없이 입력해야 합니다.
    // PW: 8~16자, 영문 소문자,대문자, 숫자 만 사용 가능
    let isValidePw = PW_REGEX.test(value)
    if (value.length === 0) {
        console.log(11)
        isValidePw = 'required'
    } else {
        isValidePw = PW_REGEX.test(value) ? true : 'invalid'
    }

    if (isValidePw !== true) {
        $pw.classList.add('border-red-600')
        $pwMsg.innerText = pw_ERROR_MSG[isValidePw]
    } else {
        $pw.classList.remove('border-red-600')
        $pwMsg.innerText = ''
    }
}
$pw.addEventListener('focusout', () => checkPwvaliation($pw.value))

// 패스워드 체크
const pw_CHECK_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '비밀번호가 일치하지 않습니다.',
}
const CheckPwCheckValiation = (value) => {
    // 비밀번호와 일치하면됨

    let isValidePwCheck
    if (value.length === 0) {
        isValidePwCheck = 'required'
    } else {
        // value === $pw.value ? true : (isValidePwCheck = 'invalid')
        isValidePwCheck = $pw.value === value ? true : 'invalid'
    }
    console.log(isValidePwCheck)

    if (isValidePwCheck !== true) {
        $pwCheck.classList.add('border-red-600')
        $pwCheckMsg.innerText = pw_CHECK_ERROR_MSG[isValidePwCheck]
    } else {
        $pwCheck.classList.remove('border-red-600')
        $pwCheckMsg.innerText = ''
    }
}
$pwCheck.addEventListener('focusout', () =>
    CheckPwCheckValiation($pwCheck.value)
)
// 패스워드 체크

$submit.addEventListener('click', (e) => {
    e.preventDefault()
    checkIdValiation($id.value)
    checkPwvaliation($pw.value)
    CheckPwCheckValiation($pwCheck.value)
})

// 4. 입력 확인 모달창
// 제출하기 버튼 클릭 시, 모든 input의 값이 유효한 상태일 경우
// 입력한 아이디와 비밀번호를 확인할 수 있는 모달 창을 보여주어야 합니다.
// "취소하기" 버튼 클릭 시 모달 창이 닫혀야 합니다.
// "가입하기" 버튼 클릭 시 윈도우의 alert 창을 이용해 "가입되었습니다 🥳 " 라는 메시지를 출력해야 합니다.
