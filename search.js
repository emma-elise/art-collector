import { API } from './app.js';


const buildSearchString = ({ root, resources: { object }, key }) => {
    const values = {
        classificationValue: $('#select-classification').val(),
        centuryValue: $('#select-century').val(),
        keywordValue: $('#keywords').val(),
    };
    const base = `${root}/${object}?${key}`;
    const terms = `classification=${values.classificationValue}&century=${values.centuryValue}`;
    return encodeURI(`${base}&${terms}${values.keywordValue.length > 0 ? `&keyword=${values.keywordValue}` : ``}`);
};

const searchURL = (searchType, searchString) => `${API.root}/object?${API.key}&${searchType}=${searchString}`;

export { buildSearchString, searchURL };
