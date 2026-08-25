const ratings = document.querySelectorAll('.rating');

ratings.forEach((rating) => {

    const stars = rating.querySelectorAll('label');
    const saveValue = rating.querySelector('input');

    stars.forEach((star, index) => {

        star.addEventListener('click', () => {

            stars.forEach((s, i) => {
                s.style.color = i <= index ? 'orange' : 'gray';
            });

            saveValue.value = index + 1;
        });

    });
});
const comments = document.querySelectorAll('.comment-container');

comments.forEach((comment) => {

    const display = comment.querySelector('div.comment');
    const edit = comment.querySelector('form.comment');

    comment.querySelector('button').addEventListener('click', () => {
        display.style.display = 'none';
        edit.style.display = 'block';
    });

});