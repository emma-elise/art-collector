import { API, onFetchStart, onFetchEnd } from './app.js';
import { updatePreview } from './preview.js';
import { buildSearchString } from './search.js';
import { renderFeature } from './summary.js';


const clickEvents = () => {
    $('#search').on('submit', async function (event) {
        event.preventDefault();
        try {
            const url = await buildSearchString(API);
            const res = await fetch(url);
            const { records, info } = await res.json();
            updatePreview(records, info);
        } catch (error) {
            console.error(error);
        }
    });

    $('#preview .next, #preview .previous').on('click', async function () {
        onFetchStart();
        try {
            const url = $(this).data('url');
            const res = await fetch(url);
            const { info, records } = await res.json();
            updatePreview(records, info);
        } catch (error) {
            console.error(error);
        } finally {
            onFetchEnd();
        }
    });

    $('#preview').on('click', '.object-preview', function (event) {
        event.preventDefault();
        const objectPreview = $(this).closest('.object-preview').data('record');
        const feature = $('#feature');
        feature.html(renderFeature(objectPreview));
    });

    $('#feature').on('click', 'a', async function (event) {
        const href = $(this).attr('href');
        if (href.startsWith('mailto')) return;
        event.preventDefault();
        onFetchStart();
        try {
            const res = await fetch((href));
            const { records, info } = await res.json();
            updatePreview(records, info);
        } catch (error) {
            console.error(error);
        } finally {
            onFetchEnd();
        }
    });
};

export { clickEvents };