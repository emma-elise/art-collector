import { prefetchCategoryLists } from './category.js';
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

const fetchObjects = async () => {
    onFetchStart();
    const baseURL = `${API.root}/${API.resources.object}?${API.key}`;
    try {
        const res = await fetch((baseURL));
        const data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    } finally {
        onFetchEnd();
    }
};

prefetchCategoryLists();
fetchObjects();
clickEvents();

export { API, onFetchStart, onFetchEnd };