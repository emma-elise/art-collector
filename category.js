import { API, onFetchStart, onFetchEnd } from "./app.js";

// const fetchCategories = async ({ root, resources: { classification, century }, key }) => {
//     onFetchStart();
//     if (localStorage.getItem('classifications') && localStorage.getItem('centuries')) return JSON.parse(localStorage.getItem('classifications', 'centuries'));
//     const classificationsURL = `${root}/${classification}?${key}&size=100&sort=name`;
//     const centuriesURL = `${root}/${century}?${key}&size=100&sort=temporalorder`;

//     try {
//         const classificationsResponse = await fetch(classificationsURL);
//         const classificationsData = await classificationsResponse.json();
//         const classificationsRecords = classificationsData.records;
//         localStorage.setItem('classifications', JSON.stringify(classificationsRecords));
//         const centuriesResponse = await fetch((centuriesURL));
//         const centuriesData = await centuriesResponse.json();
//         const centuriesRecords = centuriesData.records;
//         localStorage.setItem('centuries', JSON.stringify(centuriesRecords));
//         console.log(centuriesRecords, classificationsRecords);
//         // return [classificationsRecords, centuriesRecords];
//         return { classificationsRecords, centuriesRecords };
//     } catch (error) {
//         console.error(error);
//     } finally {
//         onFetchEnd();
//     }
// };

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
        // const classifications = await fetchCategories(API);
        // const centuries = await fetchCategories(API);

        $('.classification-count').text(`(${classifications.length})`);
        $('.century-count').text(`(${centuries.length}))`);
        classifications.forEach(classification => {
            $('#select-classification').append(`<option value="${classification.name}">${classification.name}</option>`);
        });
        centuries.forEach(century => {
            $('#select-century').append(`<option value="${century.name}">${century.name}</option>`);
        });


    } catch (error) {
        console.error(error);
    }
};

export { prefetchCategoryLists };