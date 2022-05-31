{
  'use strict';
  // Znajdowanie wszystkich linków
  /*document.getElementById('test-button').addEventListener('click', function(){
      const links = document.querySelectorAll('.titles a');
      console.log('links:', links);
  });
  */

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log('event = ', event);


    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [IN PROGRESS] add class 'active' to the clicked link */


    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    console.log('Link was clicked!');


    /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    console.log('Article was opened!');


    /* add class 'active' to the correct article */

    targetArticle.classList.add('active');
    console.log('targetArticle:', targetArticle);

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';


  function generateTitleLinks(customSelector = '') {
    console.log('funkction generateTitleLinks');

    // remove contents of titleList
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    // for each article
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for (let article of articles) {

      // get the article id
      const articleId = article.getAttribute('id');

      // find the title element
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;

      // create HTML of the link

      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('code of HTML link');
      // insert link into titleList
      const titleList = document.querySelector(optTitleListSelector);
      titleList.innerHTML = linkHTML;
      // insert link into html variable
      html = html + linkHTML;
    }


    titleList.innerHTML = html;
  }

  generateTitleLinks();


  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }

  function calculateTagsParams(tags) {

    const params = {
      max: 0,
      min: 999999,
    }

    for (let tag in tags) {
      if (tags[tag] > params.max) {
        params.max = tags[tag];
      }
      if (tags[tag] < params.min) {
        params.min = tags[tag];
      }
      console.log(tag + ' is used ' + tags[tag] + ' times');
    }

    return params;

  }

  function calculateTagClass(count, params) {
    console.log(count, params);
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return "tag-size-" + classNumber;
  }

  function generateTags() {
    console.log('funkction generateTags');

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('Link was clicked!');

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('split tags into array');

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('start of the loop of each tag')

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        console.log('generate HTML of the  link');

        /* add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {

          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {

      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = '<li><a href="#tag-' + tag + '" class="' + calculateTagClass(allTags[tag], tagsParams) + '">'+ tag + '</li>';
      allTagsHTML += tagLinkHTML;
      /* [NEW] END LOOP: for each tag in allTags: */
    }

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;
  }

  generateTags();

  function tagClickHandler(event) {

    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTagLinks = tag.querySelectorAll('a[href="' + href + '"]')

    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {


      /* remove class active */
      activeTagLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinksWithHref = document.querySelectorAll(href);
    console.log('tag links with "href" attribute equal to the "href" constant');

    /* START LOOP: for each found tag link */
    for (let tagLinkWithHref of tagLinksWithHref) {

      /* add class active */
      tagLinkWithHref.classList.add('active');
      console.log('tagLinkWithHref:', tagLinkWithHref);

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  }

  function addClickListenersToTags() {

    /* find all links to tags */
    const allLinksToTags = tag.querySelectorAll('a').innerHTML;

    /* START LOOP: for each link */
    for (let tallLinksToTag of allLinksToTags) {

      /* add tagClickHandler as event listener for that link */
      tallLinksToTag.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();

  function generateAuthors() {
    console.log('funkction generateAuthors');

    /* find all authors */
    const authors = document.querySelectorAll(optArticleAuthorSelector + customSelector);

    /* START LOOP: for every author: */
    for (let author of authors) {

      /* find authors wrapper */
      const authorList = article.querySelector(optArticleAuthorSelector);

      /* make html variable with empty string */
      let html = '';

      /* get authors from author-tags attribute */
      const authorTags = clickedElement.getAttribute('href');
      console.log('Link was clicked!');

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('generate HTML of the  link');

      /* add generated code to html variable */
      html = html + linkHTML;

      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;

      /* END LOOP: for every article: */
    }

  }

  generateAuthors();

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeAuthorLinks = tag.querySelectorAll('a[href="' + href + '"]')

    /* START LOOP: for each active tag link */
    for (let activeAuthorLink of activeAuthorLinks) {


      /* remove class active */
      activeAuthorLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinksWithHref = document.querySelectorAll(href);
    console.log('author links with "href" attribute equal to the "href" constant');

    /* START LOOP: for each found tag link */
    for (let authorLinkWithHref of authorLinksWithHref) {

      /* add class active */
      authorLinkWithHref.classList.add('active');
      console.log('authorLinkWithHref:', authorLinkWithHref);

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags="' + tag + '"]');

  }

  function addClickListenersToAuthors() {

    /* find all links to tags */
    const allLinksToAuthors = tag.querySelectorAll('a').innerHTML;

    /* START LOOP: for each link */
    for (let tallLinksToAuthor of allLinksToAuthors) {

      /* add authorClickHandler as event listener for that link */
      tallLinksToAuthor.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToAuthors()

}
