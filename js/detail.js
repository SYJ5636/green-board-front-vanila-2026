const params = new URLSearchParams(location.search);
const postId = Number(params.get("id")); // 숫자 강제 형변환

// posts 배열에서 사용자가 누른 게시글 찾기
async function loadPost() {
    try {
        // 게시글 상세 조회 API 호출
        const post = await apiRequest(`/board/${postId}`);
        renderPost(post);
        document.querySelector("#post-message").textContent = "";
        return true;
    } catch (error){
        document.querySelector("#post-title").textContent = "게시글 조회 실패";
        document.querySelector("#post-content").textContent = "";
        document.querySelector("#post-message").textContent = error.message;
        return false;
    }
}

async function loadcomments() {
    try {
        const comments = await apiRequest(`/board/${postId}/comment`);
        renderComments(comments)
    } catch (error) {
        document.querySelector("#comment-message").textContent = error.message;
    }
}


if(requireLogin()) {
    if(Number.isSafeInteger(postId) && postId > 0){
        // 비동기 작업을 위한 방법
        // 1. asnyc / await
        // 2. Promise -> then() / catch ()
        // 1번과 2번은 결과적으로 결과는 동일하다

        // 게시글 상세 정보 조회
        loadPost().then(function(success){
            if (success) {
                // 댓글 영역 표시
                loadcomments();
            }
        });
        

        // 지금 postId에 해당하는 댓글만 출력하도록 필터링
        // let filteredComments = comments.filter(comment => comment.boardId === postId);
        // renderComments(filteredComments);
    } else {
        document.querySelector("#post-title").textContent = "잘못된 게시글 번호입니다.";
        document.querySelector("#post-content").textContent = "";
    }
}



// 댓글 작성 폼 submit 시 댓글 추가
document.querySelector("#comment-form").addEventListener("submit", function (event) {
    event.preventDefault();
//     const content = document.querySelector("#comment-content").value.trim();
    
//     // 현재 페이지에 해당하는 게시글이 없거나
//     // 댓글 내용이 비어있거나 255자를 넘는 경우 예외 처리
//     if(!post || !content || content.length > 255) {
//         document.querySelector("#comment-message").textContent =
//         "댓글은 1 ~ 255자로 입력하세요."
//         return;
//     }

//     comments.push({
//         id: getCommentNextId(),
//         boardId: postId,
//         content: content,
//         author: "실습, 사용자"
//     });

//     saveLocal();

//     // 댓글을 저장했으면 해당 input을 지워주는 역할
//     document.querySelector("#comment-content").value="";
//     renderComments(comments.filter(comment => comment.boardId === postId));
})