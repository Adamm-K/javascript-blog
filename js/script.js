
'use strict';
// Znajdowanie wszystkich linków
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
});
*/
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagcloud-link').innerHTML)
};

{
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optAuthorsListSelector = '.authors',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-';

  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log('event = ', event);

    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);

    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts .active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector:', articleSelector);


    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle', targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');
    console.log('targetArticle:', targetArticle);
  };

  const generateTitleLinks = function (customSelector = '') {
    console.log('funkction generateTitleLinks');
    console.log('customSelector:', customSelector);
    console.log('optArticleSelector + customSelector:', optArticleSelector + customSelector);

    // remove contents of titleList
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';

    // for each article
    const articles = document.querySelectorAll(optArticleSelector + customSelector);

    let html = '';

    for (let article of articles) {

      // get the article id
      const articleId = article.getAttribute('id');
      console.log('articleId');

      // find the title element
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('articleTitle:', articleTitle);

      // create HTML of the link
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log('code of HTML link');
      const linkHTMLData = {id: articleId, title: articleTitle};

      const linkHTML = templates.articleLink(linkHTMLData);
      console.log('linkHTML:', linkHTML);

      // insert link into titleList

      // insert link into html variable
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  generateTitleLinks();

  const calculateTagsParams = function(tags) {

    const params = {
      max: 0,
      min: 999999,
    };

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
  };

  const calculateTagClass = function(count, params) {
    console.log(count, params);
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return optCloudClassPrefix + classNumber;
  };

  const generateTags = function() {
    console.log('funkction generateTags');

    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const articleTagsWrapper = article.querySelector(optArticleTagsSelector);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log('found tags!:', articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log('split tags into array:', articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log('start of the loop of each tag');

        /* generate HTML of the link */
        //const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        const linkHTMLData = { id: tag, title: tag };

        const linkHTML = templates.tagLink(linkHTMLData);

        console.log('generate HTML of the tag link');

        /* add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {

          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        console.log('allTags:', allTags);

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      articleTagsWrapper.innerHTML = html;
      console.log('articleTagsWrapper:', articleTagsWrapper);

      /* END LOOP: for every article: */
    }

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector(optTagsListSelector);

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams);

    //let allTagsHTML = '';
    const allTagsData = {tags: []};

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {

      /* [NEW] generate code of a link and add it to allTagsHTML */
      //const tagLinkHTML = '<li><a href="#tag-' + tag + '" class=' + calculateTagClass(allTags[tag], tagsParams) + '> ' + ' ' + tag + ' ' + ' </a></li>';
      //allTagsHTML += tagLinkHTML;
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });

      /* [NEW] END LOOP: for each tag in allTags: */
    }

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log('allTagsData:', allTagsData);
  };

  generateTags();

  const tagClickHandler = function(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement:', this);

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('href:', href);

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('extract tag:', tag);

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('activeTagLinks:', activeTagLinks);

    /* START LOOP: for each active tag link */
    for (let tag of activeTagLinks) {

      /* remove class active */
      tag.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinksWithHref = document.querySelectorAll('a[href="' + href + '"]');
    console.log('tag links with "href" attribute equal to the "href" constant:', tagLinksWithHref);

    /* START LOOP: for each found tag link */
    for (let tagLinkWithHref of tagLinksWithHref) {

      /* add class active */
      tagLinkWithHref.classList.add('active');
      console.log('tagLinkWithHref:', tagLinkWithHref);

      /* END LOOP: for each found tag link */
    }
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');

  };

  const addClickListenersToTags = function() {

    /* find all links to tags */
    const links = 'a[href^="#tag-"]';

    const allLinksToTags = document.querySelectorAll(links);
    console.log('allLinksToTags:', allLinksToTags);

    /* START LOOP: for each link */
    for (let allLinksToTag of allLinksToTags) {

      /* add tagClickHandler as event listener for that link */
      allLinksToTag.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  };

  addClickListenersToTags();

  const generateAuthors = function() {

    const allAuthors = {};

    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find all authors */
      const articleAuthorSelector = article.querySelector(optArticleAuthorSelector);

      /* find author tags*/
      const authorTags = article.getAttribute('data-author');

      /* generate HTML of the link */
      const linkHTMLData = { id: authorTags, title: authorTags };

      const linkHTML = templates.authorLink(linkHTMLData);
      console.log('generate HTML of the author link');

      /* [NEW] check if this link is NOT already in allTags */
      if (!allAuthors[authorTags]) {
        /* [NEW] add tag to allTags object */
        allAuthors[authorTags] = 1;
      } else {
        allAuthors[authorTags]++;
      }
      console.log('allAuthors:', allAuthors);

      /* insert HTML of all the links into the tags wrapper */
      articleAuthorSelector.innerHTML = linkHTML;

      /* find authors wrapper */
      const authorlist = document.querySelector(optAuthorsListSelector);

      const authorParams = calculateTagsParams(allAuthors);
      console.log('tagsParams:', authorParams);

      /* [NEW] create variable for all links HTML code*/
      let allAuthorsHTML = '';

      /* [NEW] START LOOP: for each author in allAuthors */
      for (let author in allAuthors) {

        const authorLinkHTML = '<li><a href="#author-' + author + '" class=' + calculateTagClass(allAuthors[author], authorParams) + '> ' + ' ' + author + ' '  + allAuthors[author]+ ' </a></li>';
        console.log('authorLinkHTML:', authorLinkHTML);

        /* [NEW] generate code of a link and add it to allAuthorsHTML */
        allAuthorsHTML += authorLinkHTML;
        console.log(allAuthorsHTML);
      }

      authorlist.innerHTML = allAuthorsHTML;

    /* END LOOP: for every article: */
    }
  };

  generateAuthors();

  const authorClickHandler = function(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement:', clickedElement);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    console.log('authorClickHandler:', href);

    const allAuthorLinks = document.querySelectorAll(optArticleAuthorSelector);

    /* START LOOP: for each active author link */
    for (let activeAuthorLink of allAuthorLinks) {

      /* remove class active */
      activeAuthorLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }

    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinksWithHref = document.querySelectorAll('a[href="' + href + '"]');
    console.log('author links with "href" attribute equal to the "href" constant');

    /* START LOOP: for each found author link */
    for (let authorLinkWithHref of authorLinksWithHref) {

      /* add class active */
      authorLinkWithHref.classList.add('active');
      console.log('authorLinkWithHref:', authorLinkWithHref);

      /* END LOOP: for each found tag link */
    }

    const authorExtract = href.replace('#author-', '');
    console.log(authorExtract);

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + authorExtract + '"]');
  };

  const addClickListenersToAuthors = function() {

    /* find all links to authors */
    const allLinksToAuthors = 'a[href^="#author-"]';

    const allAuthors = document.querySelectorAll(allLinksToAuthors);

    /* START LOOP: for each link */
    for (let authorLink of allAuthors) {

      /* add authorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  };

  addClickListenersToAuthors();

}
