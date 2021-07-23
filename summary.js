import { searchURL } from './search.js';

const renderFeature = (record) => {
    const {
        contact, creditline, culture, dated, department, description, dimensions, division, images, medium, people, primaryimageurl, style, technique, title,
    } = record;
    return $(`<div class="object-feature">
        <header>
            <h3>${title}</h3>
            <h4>${dated}</h4>
        </header>
        <section class="facts">
            ${factHTML('Description', description)}
            ${factHTML('Culture', culture, 'culture')}
            ${factHTML('Style', style)}
            ${factHTML('Technique', technique, 'technique')}
            ${factHTML('Medium', medium, 'medium')}
            ${factHTML('Dimensions', dimensions)}
            ${people ? people.map((person) => factHTML('Person', person.displayname, 'person')).join('') : ''}
            ${factHTML('Department', department)}
            ${factHTML('Division', division)}
            ${factHTML('Contact', `<a target="_blank" href="mailto:${contact}">${contact}</a>`)}
            ${factHTML('Credit', creditline)}
        </section>
            <section class="photos">
                ${photosHTML(images, primaryimageurl)}
            </section>
        </div>`);
};

const factHTML = (title, content, searchTerm = null) => {
    if (!content) {
        return "";
    } else if (!searchTerm) {
        return `<span class="title">${title}</span><span class="content">${content}</span>`;
    } else {
        return `<span class="title">${title}</span><span class="content"><a href="${searchURL(title, content)}">${content}</a></span>`;
    }
};

const photosHTML = (images, primaryimageurl) => {
    if (images.length > 0) {
        return images.map(image => `<img src="${image.baseimageurl}"/>`).join("");
    } else if (primaryimageurl) {
        return `<img src="${primaryimageurl}"/>`;
    } else {
        return "";
    }
};

export { renderFeature };