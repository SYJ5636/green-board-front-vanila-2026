// 로그인 안 되어 있을 시 로그인 페이지로 리다이렉트
if (requireLogin()) {

    // 게시글 리스트 조회 및 렌더링
    loadPosts();
}

async function loadPosts() {
    try {
        const response = await fetch(
            "http://127.0.0.1:8080/api/board?page=0&size=10", 
            { headers: {...getAuthHeaders()}
        });
        const result = await response.json();

        if(!response.ok || !result.success)
            throw new Error(result.message || "목록 조회 실패");
        renderPosts(result.data.content);
        document.querySelector("#List-message").textContent =
        `전체 ${result.data.totalElements}개`         
    } catch (error) {
        document.querySelector("list-message").textContent = error.message;
    }
}