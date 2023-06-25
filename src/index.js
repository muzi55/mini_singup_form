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

const checkIdRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return ID_REGEX.test(value) ? true : 'invalid'
    }
}
const checkIdValiation = (value) => {
    // 유효성 검사 패턴
    // 모든 필드의 값은 빠짐 없이 입력해야 합니다.
    // ID: 5~20자, 영문 소문자,대문자, 숫자, 특수문자(-), (_)만 사용 가능
    const isValideId = ID_REGEX.test(value)
    const isValidId = checkIdRegex(value)
    // 커스텀 에러 메세지
    // (1) 비어 있을때 (2) 유효하지 않은 값일때
    // input 태크에 border-red-600 class 추가 & **-msg에 에러 메세지 추가

    if (isValidId !== true) {
        // isValidId 가 required 일 때
        $id.classList.add('border-red-600')
        $idMsg.innerText = ID_ERROR_MSG[isValidId]
    } else {
        $id.classList.remove('border-red-600')
        $idMsg.innerText = ''
    }
    return isValidId
}
$id.addEventListener('focusout', () => checkIdValiation($id.value))

// 패스워드 확인
const pw_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '8~16자, 영문 소문자,대문자, 숫자 만 사용 가능합니다.',
}
const checkPwRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return PW_REGEX.test(value) ? true : 'invalid'
    }
}
const checkPwvaliation = (value) => {
    // 유효성 검사 패턴
    // 모든 필드의 값은 빠짐 없이 입력해야 합니다.
    // PW: 8~16자, 영문 소문자,대문자, 숫자 만 사용 가능
    const isValidPw = checkPwRegex(value)

    if (isValidPw !== true) {
        $pw.classList.add('border-red-600')
        $pwMsg.innerText = pw_ERROR_MSG[isValidPw]
    } else {
        $pw.classList.remove('border-red-600')
        $pwMsg.innerText = ''
    }
    return isValidPw
}
$pw.addEventListener('focusout', () => checkPwvaliation($pw.value))

// 패스워드 체크
const pw_CHECK_ERROR_MSG = {
    required: '필수 정보입니다.',
    invalid: '비밀번호가 일치하지 않습니다.',
}
const checkPwCheckRegex = (value) => {
    if (value.length === 0) {
        return 'required'
    } else {
        return value === $pw.value ? true : 'invalid'
    }
}
// 비밀번호 재확인
const CheckPwCheckValiation = (value) => {
    // 비밀번호와 일치하면됨

    const isValidePwCheck = checkPwCheckRegex(value)

    if (isValidePwCheck !== true) {
        $pwCheck.classList.add('border-red-600')
        $pwCheckMsg.innerText = pw_CHECK_ERROR_MSG[isValidePwCheck]
    } else {
        $pwCheck.classList.remove('border-red-600')
        $pwCheckMsg.innerText = ''
    }
    return isValidePwCheck
}
$pwCheck.addEventListener('focusout', () =>
    CheckPwCheckValiation($pwCheck.value)
)

// 4. 입력 확인 모달창
// 제출하기 버튼 클릭 시, 모든 input의 값이 유효한 상태일 경우
// 입력한 아이디와 비밀번호를 확인할 수 있는 모달 창을 보여주어야 합니다.
// "취소하기" 버튼 클릭 시 모달 창이 닫혀야 합니다.
// "가입하기" 버튼 클릭 시 윈도우의 alert 창을 이용해 "가입되었습니다 🥳 " 라는 메시지를 출력해야 합니다.

const $modal = document.getElementById('modal')
const $confirmId = document.getElementById('confirm-id')
const $confirmPw = document.getElementById('confirm-pw')
const $cancelBtn = document.getElementById('cancel-btn')
const $approveBtn = document.getElementById('approve-btn')

$submit.addEventListener('click', (e) => {
    e.preventDefault()
    const isValidForm =
        checkIdValiation($id.value) === true &&
        checkPwvaliation($pw.value) === true &&
        CheckPwCheckValiation($pwCheck.value) === true
    if (isValidForm) {
        // showModal() 은 뒤에 배경이 모이게끔 보여주는 메서드
        $modal.showModal()
        $confirmId.innerText = $id.value
        $confirmPw.innerText = $pw.value
    }
})
$cancelBtn.addEventListener('click', () => {
    // close는 모달이 닫히게끔  하는 메서드
    $modal.close()
})
$approveBtn.addEventListener('click', () => {
    $modal.close()
    alert('가입 완료라구 !')
    $id.value = ''
    $pw.value = ''
    $pwCheck.value = ''
})

// 5 폰트 사이즈 조절 버튼
// 회원가입 폼에 사용된 기본 폰트 사이즈는 16px입니다.
// 기본 폰트 사이즈를 기준으로 1px씩 폰트 사이즈를 조절할 수 있는 기능을 구현해주세요.
// (최소: 12px, 최대: 20px)
// 현재 폰트 사이즈가 20px일 경우 + 버튼 비활성화
// 현재 폰트 사이즈가 12px일 경우 - 버튼 비활성화
