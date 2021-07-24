import { API, onFetchStart, onFetchEnd } from './app.js';
import { updatePreview } from './preview.js';
import { buildSearchString } from './search.js';
import { renderFeature } from './summary.js';


const clickEvents = () => {

    $('#search').on('submit', async function (event) {
        event.preventDefault();
        try {
            const { records, info } = await (await fetch(buildSearchString(API))).json();
            updatePreview(records, info);
        } catch (error) {
            console.error(error);
        }
    });

    $('#preview .next, #preview .previous').on('click', async function () {
        onFetchStart();
        try {
            const { records, info } = await (await fetch($(this).data('url'))).json();
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
        $('#feature').html(renderFeature(objectPreview));
    });

    $('#feature').on('click', 'a', async function (event) {
        event.preventDefault();
        const href = $(this).attr('href');
        if (href.startsWith('mailto')) return;
        onFetchStart();
        try {
            const { records, info } = await (await fetch((href))).json();
            updatePreview(records, info);
        } catch (error) {
            console.error(error);
        } finally {
            onFetchEnd();
        }
    });
};

export { clickEvents };