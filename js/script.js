'use strict';

// Znajdowanie wszystkich linków
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });
  */
  
const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log("event = ", event);
    
}
  
    /* [DONE] remove class 'active' from all article links  */

const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
  activeLink.classList.remove('active');
}
  
    /* [IN PROGRESS] add class 'active' to the clicked link */

    
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);
  
    /* [DONE] remove class 'active' from all articles */

const activeArticles = document.querySelectorAll('.posts .active');

for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
}
  
    /* get 'href' attribute from the clicked link */

const articleSelector = document.getAttribute("href");
console.log("Link was clicked!");

  
    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector('.posts .active')
    console.log("Article was opened!");

  
    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
    console.log('targetArticle:', targetArticle);
  
  
const links = document.querySelectorAll('.titles a');
  
for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }

