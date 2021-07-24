import { fetchCategories } from './category.js';
import { clickEvents } from './navigation.js';

const API = {
    key: "apikey=21a7ec96-c8f0-4b9a-ad90-b099c93c2594",
    resources: {
        object: "object",
        classification: "classification",
        century: "century",
    },
    root: "https://api.harvardartmuseums.org",
};

const onFetchStart = () => $('#loading').addClass('active');

const onFetchEnd = () => $('#loading').removeClass('active');

const fetchObjects = async ({ root, resources: { object }, key } = API) => {
    onFetchStart();
    const baseURL = `${root}/${object}?${key}`;
    try {
        return await (await fetch(baseURL)).json();
    } catch (error) {
        console.error(error);
    } finally {
        onFetchEnd();
    }
};

fetchCategories();
fetchObjects();
clickEvents();

export { API, onFetchStart, onFetchEnd };