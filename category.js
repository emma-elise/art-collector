import { API, onFetchStart, onFetchEnd } from "./app.js";

const fetchAllCenturies = async ({ root, resources: { century }, key }) => {
    onFetchStart();
    if (localStorage.getItem('centuries')) return JSON.parse(localStorage.getItem('centuries'));
    const centuriesURL = `${root}/${century}?${key}&size=100&sort=temporalorder`;
    try {
        const res = await fetch((centuriesURL));
        const data = await res.json();
        const records = data.records;
        localStorage.setItem("centuries", JSON.stringify(records));
        return records;
    } catch (error) {
        console.error(error);
    } finally {
        onFetchEnd();
    }
};


const fetchAllClassifications = async ({ root, resources: { classification }, key }) => {
    onFetchStart();
    if (localStorage.getItem('classifications')) return JSON.parse(localStorage.getItem('classifications'));
    const classificationsURL = `${root}/${classification}?${key}&size=100&sort=name`;
    try {
        const res = await fetch((classificationsURL));
        const data = await res.json();
        const records = data.records;
        localStorage.setItem("classifications", JSON.stringify(records));
        return records;
    } catch (error) {
        console.error(error);
    } finally {
        onFetchEnd();
    }
};

const prefetchCategoryLists = async () => {
    try {
        const [
            classifications, centuries
        ] = await Promise.all([
            fetchAllClassifications(API),
            fetchAllCenturies(API)
        ]);
        $('.classification-count').text(`(${classifications.length})`);
        classifications.forEach(classification => {
            $('#select-classification').append(`<option value="${classification.name}">${classification.name}</option>`);
        });

        $('.century-count').text(`(${centuries.length}))`);
        centuries.forEach(century => {
            $('#select-century').append(`<option value="${century.name}">${century.name}</option>`);
        });
    } catch (error) {
        console.error(error);
    }
};

export { prefetchCategoryLists };