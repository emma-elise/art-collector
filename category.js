import { API, onFetchStart, onFetchEnd } from "./app.js";

const fetchCategories = async ({ root, resources: { classification, century }, key } = API) => {
    onFetchStart();
    try {
        //  Fetch and append classifications
        const classificationsURL = `${root}/${classification}?${key}&size=100&sort=name`;
        let classifications = await (await fetch(classificationsURL)).json();
        classifications = classifications.records;
        $('.classification-count').text(`(${classifications.length})`);
        classifications.forEach(classification => {
            $('#select-classification').append(`<option value="${classification.name}">${classification.name}</option>`);
        });
        //  Fetch and append centuries
        const centuriesURL = `${root}/${century}?${key}&size=100&sort=temporalorder`;
        let centuries = await (await fetch(centuriesURL)).json();
        centuries = centuries.records;
        $('.century-count').text(`(${centuries.length}))`);
        centuries.forEach(century => {
            $('#select-century').append(`<option value="${century.name}">${century.name}</option>`);
        });
    } catch (error) {
        console.error(error);
    } finally {
        onFetchEnd();
    }
};

export { fetchCategories };