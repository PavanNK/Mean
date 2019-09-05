$(document).ready(function() {
  $('#stationary-dropdown').change(event => {
    const stationary = JSON.parse(event.target.value);
    $('#s_name').html(stationary.name || 'nil');
    $('#s_unit_price').html(stationary.unit_price || 'nil');
    $('#s_quantity').val('');
    $('#item_id').val(stationary.id);
  });

  $('.delete-stat').on('click', event => {
    event.preventDefault();
    $.ajax({
      url: event.target,
      type: 'DELETE'
    }).done(function() {
      window.location.href = '/cart';
      alert('Deleted!');
    });
  });

  $('.update-stat').on('blur', event => {
    const id = event.target.dataset.id;
    $.ajax({
      url: `/stationaries/${id}`,
      type: 'PUT',
      data: {
        quantity: event.target.value
      }
    }).done(function() {
      window.location.href = '/cart';
    });
  });

  $('.delete-transaction').on('click', event => {
    event.preventDefault();
    const id = event.currentTarget.dataset.id;
    console.log('currentid', id);
    $.ajax({
      url: `/transactions/${id}`,
      type: 'DELETE'
    }).done(function() {
      window.location.href = '/home';
    });
  });

  $('.update-transaction').on('click', event => {
    const id = event.currentTarget.dataset.id;
    console.log('what is id', id);
    const data = {};
    const $inputs = $(`input.${id}-quantity`).each((i,j) => {
      data[j.dataset.id] = j.value;
    });
    console.log('what is ', data);
    $.ajax({
      url: `/transactions/${id}`,
      type: 'PUT',
      data: data
    }).done(function() {
      window.location.href = '/home';
    });
  });

  $('.approve-transaction').on('click', event => {
    const id = event.currentTarget.dataset.id;
    console.log('what is id', id);
    $.ajax({
      url: `/transactions/${id}/approve`,
      type: 'POST'
    }).done(function() {
      window.location.href = '/home';
    });
  });
});