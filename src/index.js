// TODO: 이 곳에 정답 코드를 작성해주세요.
// 1. 페이지가 로드 되었을때, ID입력창에 Focusing 되어있어야함.
// 대상: ID 입력창
// 시점: 페이지 로드 되었을 때
// 이벤트: focus()

// $붙히는 이유 => 코드를 읽는 사람이 이거는 Dom을 가져온것이라 말함
const $id = document.getElementById('id')
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
