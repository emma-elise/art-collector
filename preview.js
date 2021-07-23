const renderPreview = (record) => {
    const { description, primaryimageurl, title } = record;
    return $(`<div class="object-preview">
            <a href="#">
                ${primaryimageurl ? `<img src="${primaryimageurl}"/>` : ``}
                ${title ? `<h3>${title}</h3>` : ``}
                ${description ? `<h3>${description}</h3>` : ``}
            </a>
    </div>`).data('record', record);
};

const updatePreview = (records, info) => {
    const root = $('#preview');
    info.next ? root.find('.next').data("url", info.next).attr('disabled', false) : root.find('.next').data('url', null).attr('disabled', true);
    info.prev ? root.find('.previous').data('url', info.prev).attr('disabled', false) : root.find('.previous').data('url', null).attr('disabled', false);
    const results = root.find('.results');
    results.empty();
    records.forEach((record) => results.append(renderPreview(record)));
};

export { renderPreview, updatePreview };