$(document).ready(function () {

    $('.calc-forms input').on('keypress', (function (evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault();
    } else {
    return true;
    }
    }))
    var reqInput = "";
    var input = ""
    /* previous button and next button code starts here*/
    $('#peviousBtn').click(function() {
        input--;
        console.log(input);
      
        if (input > 0) {
         $('.mesurement-dimension input[tabindex=' + input + ']').focus();
        }
      
       });
       $('#nextBtn').click(function() {
        input++;
        console.log(input);
        if (input > 0) {
         $('.mesurement-dimension input[tabindex=' + input + ']').focus();
        }
      
       })
       $('.clear').click(function() {
        console.log($('.mesurement-dimension input[tabindex=' + input + ']').val(''));
        var reqVal = $('.mesurement-dimension input[tabindex=' + input + ']').focus;
      
       })
      
       $('.mesurement-dimension input').focus(function() {
      
        hasValue();
      
        function hasValue() {
         if ($('#interiorLength').val() && $('#interiorWidth').val() && $('#doorsCustominterior').val() && $('#windowsCustominterior').val()) {
          $('.btn-caluculate').prop('disabled', false);
      
         } else {
          $('.btn-caluculate').prop('disabled', true);
         }
        };
      
       
      
        reqInput = $(this).attr("id");
        input = $(this).attr("tabindex");
        console.log(input);
      
      
        /* previous button and next code ends here*/
        var eq = "";
        var curNumber = "";
        var result = "";
        var entry = "";
        var reset = false;
        var btnName = "";
      
      
        $("#keyboard button").click(function() {
         entry = $(this).attr("value");
      
      
         if (isNaN(entry)) { //check if is not a number, and after that, prevents for multiple "." to enter the same number
          if (entry !== ".") {
           reset = false;
           if (curNumber === 0 || eq === 0) {
            curNumber = 0;
            eq = entry;
           } else {
            curNumber = "";
            eq += entry;
           }
         
          } else if (curNumber.indexOf(".") === -1) {
          
           reset = false;
           if (curNumber === 0 || eq === 0) {
            curNumber = 0.;
            eq = 0.;
           } else {
            curNumber += entry;
            eq += entry;
           }
           $('#' + reqInput).val(curNumber);
           $('#' + reqInput).val(eq);
          }
         } else {
          if (reset) {
           eq = entry;
           curNumber = entry;
           reset = false;
          } else {
           eq += entry;
           curNumber += entry;
          }
          $('#' + reqInput).val(eq);
          $('#' + reqInput).val(curNumber);
      
         }
      
         if (result.indexOf(".") !== -1) {
          result = result.truncate()
         }
      
        });
      
        displayResults(selectedForm, selectedSubForm);
       });
      
      
       $('.btn-caluculate').click(function() {
      
        $('.paint-results').removeClass('d-none').addClass('d-block');
        $('.calc-container').removeClass('d-block').addClass('d-none');
       })
      
      
       /*for virtual keyboard code ends here*/
   
    // $('#calc-print').click(function () {
    // window.print();
    // })
   
    // $('#calc-email').click(function () {
    // $('#overlay-calc-email').show();
   
    // $('.overlay-calc-background').height($('body').height());
    // $('.overlay-calc-background').width($('body').width());
   
    // $('.overlay-calc-background').show();
    
    // $("html, body").animate({ scrollTop: 0 }, "slow");
    // })
   
    /*for virtual keyboard*/
    $('.mesurement-dimension input').click(function () {
    $('.paint-results').addClass('d-none');
    $('.calculator').addClass('d-block');
   
    const calculator = $('.calc-calculator');
    const keys = $('.calculator__keys')
    
    $(".calculator__keys").click(function(e){
    if (e.target.matches('button')) {
    alert("button");
    }
    }); 
    });
    /* virtual code ends here*/
   
    $('#calc-recipientList').on('input', (function (e) {
    $('.overlay-emailerror_message').hide();
    }))
   
    $('#calc-email-send').click(function () {
    var recipientList = replaceALL($('#calc-recipientList').val(), " ", "").split(",");
    var allValidEmail = true;
   
    if ($('#calc-recipientList').val() === '') {
    allValidEmail = false;
    } else {
    for (var i = 0; i < recipientList.length; i++) {
    recipientList[i] = recipientList[i].trim();
    if (recipientList[i] !== '' && !isValidEmail(recipientList[i])) {
    allValidEmail = false;
    break;
    }
    }
    }
    if (!allValidEmail) {
    $('.overlay-emailerror_message').show();
    return false;
    }
   
    var serverURL = window.location.protocol + '//' + window.location.hostname;
    if (window.location.hostname === '') {
    serverURL = "https://new-dev.behr.com";
    }
    var data = getCalculationEmailData();
    data.sender = "do_not_reply@behr.com";
    data.email = "do_not_reply@behr.com";
    data.emailOptIn = "0";
    data.recipientList = $('#calc-recipientList').val();
    data.message = "";
    data.inquiryType = "calculation";
    data.subject = "My Project Quantity Calculations";
           var formData = new FormData();
           $.each(data, function(key, value) {
               if($.isArray(value)) {
                   $.each(value, function(k,v) {
                       formData.append(key, v);
                   });
               } else {
                   formData.append(key, value);
               }
           });
   
    var stringJSONData = JSON.stringify(data);
    $.ajax(serverURL + '/mainService/services/csmail', {
    data: formData,
    type: 'post',
               enctype: 'multipart/form-data',
               dataType: 'text',
               cache: false,
               async: false,
               contentType: false,
               processData: false
    }).done(function (response) {
    $('#overlay-calc-email').hide();
    $('.overlay-calc-background').hide();
    }) .fail( function (response, xhr) {
               console('error');
           });
    })
   
    $('.overlay-close').click(function () {
    $('#overlay-calc-email').hide();
    $('.overlay-calc-background').hide();
    })
   
    $('.overlay-calc-background').click(function () {
    $('#overlay-calc-email').hide();
    $('.overlay-calc-background').hide();
    })
   
    $('.calc-size-toggle-btn > button').click(function () {
    $(this).siblings().removeClass('btn-secondary');
    $(this).siblings().addClass('btn-primary');
    $(this).removeClass('btn-primary');
   
    $(this).addClass('btn-secondary');
   
    // toggleForm
    selectedSubForm = $(this).attr('id');
    console.log('clicked subform: ' + selectedSubForm + selectedForm);
   
    $('.calc-forms > section.' + selectedForm + 'Form > div').removeClass('d-block').addClass('d-none');
    $('.calc-forms > section.' + selectedForm + 'Form > div.' + selectedSubForm + selectedForm).toggleClass('d-block d-none');
   
    $('.calc-toggle-dropdown').val(selectedForm);
   
    displayResults(selectedForm, selectedSubForm);
    })
   
    $('.calc-toggle-btn > a').click(function () {
    // toggleBtn
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
   
    // toggleForm
    selectedForm = $(this).attr('id');
   
    $('.calc-toggle-dropdown').val(selectedForm);
    $('.calc-toggle-dropdown').trigger('change');
    })
   
    $('.calc-toggle-dropdown').change(function (e) {
    selectedForm = this.value;
    $('.calc-forms > section').removeClass('d-block').addClass('d-none');
    $('.calc-forms > section.' + selectedForm + "Form").toggleClass('d-block');
   
    $('.calc-forms > section.' + selectedForm + 'Form > div').removeClass('d-block').addClass('d-none');
    $('.calc-forms > section.' + selectedForm + 'Form > div.' + selectedSubForm + selectedForm).toggleClass('d-block d-none');
   
    //show extras only on interior or exterior
    if (selectedForm == 'interior' || selectedForm == 'exterior') {
    $('#paint-extra').removeClass('d-none').addClass('d-block');
    if (selectedForm == 'interior') {
    $('#custom-paint-vaulted').removeClass('d-none').addClass('d-block').addClass('calc-center');
    } else {
    $('#custom-paint-vaulted').removeClass('d-block').removeClass('calc-center').addClass('d-none');
    $('#custom-paint-touchup').removeClass('col-lg-6').addClass('calc-center');
    }
    } else {
    $('#paint-extra').removeClass('d-block').addClass('d-none');
    }
   
    if (selectedForm == 'interior') {
    $('#calc-cta').text('How big is your room?');
    } else if (selectedForm == 'exterior') {
    $('#calc-cta').text('How big is your home?');
    } else if (selectedForm == 'woodStain') {
    $('#calc-cta').text('How big is your wood stain project?');
    } else if (selectedForm == 'floorCoatings') {
    $('#calc-cta').text('How big is your floor coatings project?');
    }
    $('#interiorLength').val('');
    $('#interiorWidth').val('');
   
    displayResults(selectedForm, selectedSubForm);
    })
   
    $('.form-check-input').change(function (e) {
    displayResults(selectedForm, selectedSubForm);
    })
   
    $('.form-control').on('input', (function (e) {
    displayResults(selectedForm, selectedSubForm);
    }))
   
    $("input[name='metrics']").on('change', (function () {
    bImperial = $("input[name='metrics']:checked").val() === 'option1';
    console.log("imerial selected: " + bImperial);
   
    if (bImperial) {
    $('.length-uofm').text('ft.');
    $('.area-uofm').text('sq. ft.');
    var sqmtval = $('#squareFeet').val();
    $('#squareFeet').val(toSqFt(sqmtval));
   
    $('#woodStainLength').val(toFeet(Number($('#woodStainLength').val())));
    $('#woodStainWidth').val(toFeet(Number($('#woodStainWidth').val())));
   
    $('#floorCoatingsLength').val(toFeet(Number($('#floorCoatingsLength').val())));
    $('#floorCoatingsWidth').val(toFeet(Number($('#floorCoatingsWidth').val())));
   
    $('#interiorLength').val(toFeet(Number($('#interiorLength').val())));
    $('#interiorWidth').val(toFeet(Number($('#interiorWidth').val())));
   
    var measures = $('label.measure-lenth');
    for (var i = 0; i < measures.length; i++) {
    $(measures[i]).text(intMeasures[i]);
    }
   
    var presetArea = $('label.preset-area');
    for (var i = 0; i < presetArea.length; i++) {
    $(presetArea[i]).text(presetAreaMeasuresSQFT[i]);
    }
    } else {//metric
    // change unit display to meter / sq. meter
    $('.length-uofm').text('m');
    $('.area-uofm').text('sq. meter');
    // display measurements entered in meter
    var sqftval = $('#squareFeet').val();
    $('#squareFeet').val(toSqMt(sqftval));
   
    $('#woodStainLength').val(toMeter(Number($('#woodStainLength').val())));
    $('#woodStainWidth').val(toMeter(Number($('#woodStainWidth').val())));
   
    $('#floorCoatingsLength').val(toMeter(Number($('#floorCoatingsLength').val())));
    $('#floorCoatingsWidth').val(toMeter(Number($('#floorCoatingsWidth').val())));
   
    $('#interiorLength').val(toMeter(Number($('#interiorLength').val())));
    $('#interiorWidth').val(toMeter(Number($('#interiorWidth').val())));
   
    var measures = $('label.measure-lenth');
    for (var i = 0; i < measures.length; i++) {
    $(measures[i]).text(toMeter(Number($(measures[i]).text())));
    }
    var presetArea = $('label.preset-area');
    for (var i = 0; i < presetArea.length; i++) {
    $(presetArea[i]).text(presetAreaMeasuresSQMT[i]);
    }
    }
   
    displayResults(selectedForm, selectedSubForm);
    }))
   
   
   
    var domainLocation = window.location.hostname.split(".")[window.location.hostname.split(".").length - 1];
   
    var pathArray = window.location.pathname.split('/');
    var loadForm = pathArray[pathArray.length - 2];
    var loadUnit = pathArray[pathArray.length - 1];
   
    if (projectList.includes(loadForm)) {
    selectedForm = loadForm;
    } else {
    selectedForm = 'interior';
    }
    
    if (loadUnit.toLowerCase() != 'imperial' && domainLocation.toLowerCase() === 'ca') {
    loadUnit = 'metric';
    }
   
    if (loadUnit === 'metric') {
    $("#metricsY").prop('checked', true);
    $("#metricsN").prop('checked', false);
    } else {
    $("#metricsY").prop('checked', false);
    $("#metricsN").prop('checked', true);
    }
   
    selectedSubForm = "small";
    $('.calc-toggle-dropdown').val(selectedForm);
   
    bImperial = $("input[name='metrics']:checked").val() === 'option1';
    $("input[name='metrics']").change();
    document.getElementById(selectedForm).click();
   
    if (selectedForm == 'interior' || selectedForm == 'exterior') {
    $('#paint-extra').removeClass('d-none').addClass('d-block');
    if (selectedForm == 'interior') {
    $('#custom-paint-vaulted').removeClass('d-none').addClass('d-block');
    } else {
    $('#custom-paint-vaulted').removeClass('d-block').addClass('d-none');
    }
    } else {
    $('#paint-extra').removeClass('d-block').addClass('d-none');
    }
   
    displayResults(selectedForm, selectedSubForm);
   })
   
   String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
   };
   
   function replaceALL(target, search, replacement) {
    return target.replace(new RegExp(search, 'g'), replacement);
   }
   
   var intMeasures = [5, 8, 12, 15, 20, 25];
   var presetAreaMeasuresSQFT = ['1,300', '2,500', '4,000', '200', '500', '1,000', '200', '400', '800'];
   var presetAreaMeasuresSQMT = ['121', '232', '372', '19', '47', '93', '19', '37', '74'];
   var projectList = ['interior', 'exterior', 'floorCoatings', 'woodStain'];
   
   var selectedForm;
   var selectedSubForm;
   var bImperial;
   var calculationData = {};
   
   var VAULTED_CEILING_HEIGHT = 12,
    VAULTED_CEILING_FACTOR = 1.103377919,
    STANDARD_CEILING_HEIGHT = 9,
    FOOTAGE_2_SURFACE_FACTOR = 1.75,
    GARAGEDOOR_SURFACE_AREA = 56,
    GARAGEDOOR_1CAR_PERIMETER = 22,
    GARAGEDOOR_2CAR_PERIMETER = 30,
    GARAGEDOOR_3CAR_PERIMETER = 52,
    SHUTTERS_SURFACE_AREA = 6,
    WINDOW_PERIMETER = 18,
    WINDOW_SURFACE_AREA = 20,
    DOOR_PERIMETER = 17,
    DOOR_SURFACE_AREA = 21,
    TOUCHUP_QTY_FACTOR = 1.05,
    SPREAD_RATE = 350,
    QUART_THRESHOLD = 0.25;
   
   function rectifyTouchUpValue(t) {
    return t ? TOUCHUP_QTY_FACTOR : 1;
   }
   function rectifyVaultedValue(v) {
    return v ? VAULTED_CEILING_FACTOR : 1;
   }
   
   function calculate(formId, subFormId) {
    calculationData = {};
    if (formId == 'interior') {
    calculateInterior(subFormId);
    } else if (formId == 'exterior') {
    calculateExterior(subFormId);
    } else if (formId == 'woodStain') {
    calculateWoodStain(subFormId);
    } else if (formId == 'floorCoatings') {
    calculateFloorCoatings(subFormId);
    }
   }
   
   function calculatePaintQuantity(elementQty, fractionalQty) {
    var gallon = 0.0;
    var quart = 0.0;
    var data = new Array();
    if (fractionalQty > QUART_THRESHOLD) {
    gallon = Math.ceil(elementQty);
    quart = 0;
    } else if ((fractionalQty > 0) || (elementQty > 0)) {
    gallon = Math.floor(elementQty);
    if (fractionalQty > 0.0) {
    quart = 1;
    } else {
    quart = 0;
    }
    }
    data.push(gallon);
    data.push(quart);
   
    return data;
   }
   
   function calculateInternalWallQuantity(length, width, doors, windows, vaulted, btouchUp) {
    var wallHeight = STANDARD_CEILING_HEIGHT;
    if (vaulted) {
    wallHeight = VAULTED_CEILING_HEIGHT;
    }
    var touchUp = rectifyTouchUpValue(btouchUp);
    if (!(windows > 0)) {
    windows = 0;
    }
    if (!(doors > 0)) {
    doors = 0;
    }
   
    var wallsQty = (2.0 * wallHeight * (Number(length) + Number(width)) - (windows * WINDOW_SURFACE_AREA) - (doors * DOOR_SURFACE_AREA)) * touchUp / SPREAD_RATE;
   
    if (wallsQty < 0.0)
    wallsQty = 0;
   
    var fractionalWallsQty = wallsQty - Math.floor(wallsQty);
   
    return calculatePaintQuantity(wallsQty, fractionalWallsQty);
   }
   
   function calculateDoorQuantity(doors, btouchUp) {
    var touchUp = rectifyTouchUpValue(btouchUp);
   
    var doorsQty = (doors * DOOR_SURFACE_AREA) * touchUp / SPREAD_RATE;
    var fractionalDoorQty = doorsQty - Math.floor(doorsQty);
   
    return calculatePaintQuantity(doorsQty, fractionalDoorQty);
   }
   
   function calculateInternalTrimQuantity(length, width, doors, windows, btouchUp) {
    var touchUp = rectifyTouchUpValue(btouchUp);
   
    if (!(windows > 0)) {
    windows = 0;
    }
    if (!(doors > 0)) {
    doors = 0;
    }
   
    var trimQty = (2 * (Number(length) + Number(width)) + Number(windows) * WINDOW_PERIMETER) * touchUp / SPREAD_RATE;
    var fractionalTrimQty = trimQty - Math.floor(trimQty);
   
    return calculatePaintQuantity(trimQty, fractionalTrimQty);
   }
   
   function calculateCeilingQuantity(length, width, bvaulted, btouchUp) {
    var vaulted = rectifyVaultedValue(bvaulted);
    var touchUp = rectifyTouchUpValue(btouchUp);
    var ceilingQty = ((length * width) * vaulted * touchUp) / SPREAD_RATE;
    var fractionalCeilingQty = ceilingQty - Math.floor(ceilingQty);
   
    return calculatePaintQuantity(ceilingQty, fractionalCeilingQty);
   }
   
   function calculateInterior(subFormId) {
    var length = 0;
    var width = 0;
    var doors = 0;
    var windows = 0;
   
    var touchup = $("input[name='touchUp']:checked").val() === 'option1';
    var vaulted = $("input[name='vaulted']:checked").val() === 'option1';
   
    if (subFormId == 'custom') {
  

    length = $('#interiorLength').val();
    width = $('#interiorWidth').val();
    doors = $('#doorsCustominterior').val();
    windows = $('#windowsCustominterior').val();
    } else if (subFormId == "small") {
    length = 5;
    width = 8;
    doors = 1;
    windows = 1;
    } else if (subFormId == "medium") {
    length = 12;
    width = 15;
    doors = 2;
    windows = 4;
    } else if (subFormId == "large") {
    length = 20;
    width = 25;
    doors = 4;
    windows = 8;
    }
   
    var wallQty = calculateInternalWallQuantity(length, width, doors, windows, vaulted, touchup);
    $('.wall-res.interior-paint-results > td > div > span .gallon-value').text(wallQty[0]);
    $('.wall-res.interior-paint-results > td > div > span .quart-value').text(wallQty[1]);
   
    var doorsQty = calculateDoorQuantity(doors, touchup);
    $('.doors-res.interior-paint-results > td > div > span .gallon-value').text(doorsQty[0]);
    $('.doors-res.interior-paint-results > td > div > span .quart-value').text(doorsQty[1]);
   
    var trimQty = calculateInternalTrimQuantity(length, width, doors, windows, touchup);
    $('.trim-res.interior-paint-results > td > div > span .gallon-value').text(trimQty[0]);
    $('.trim-res.interior-paint-results > td > div > span .quart-value').text(trimQty[1]);
   
    var ceilingQty = calculateCeilingQuantity(length, width, vaulted, touchup);
    $('.ceiling-res.interior-paint-results > td > div > span .gallon-value').text(ceilingQty[0]);
    $('.ceiling-res.interior-paint-results > td > div > span .quart-value').text(ceilingQty[1]);
   
    calculationData.length = length;
    calculationData.width = width;
    calculationData.doors = doors;
    calculationData.windows = windows;
    if (touchup) {
    calculationData.touchUp = 'Y';
    } else {
    calculationData.touchUp = 'N';
    }
    if (vaulted) {
    calculationData.vaultedCeiling = 'Y';
    } else {
    calculationData.vaultedCeiling = 'N';
    }
    calculationData.results = ['* WALL: ' + wallQty[0] + ' Gallon(s) ' + wallQty[1] + ' Qts\n',
               '* DOORS: ' + doorsQty[0] + ' Gallon(s) ' + doorsQty[1] + ' Qts\n',
               '* TRIM: ' + trimQty[0] + ' Gallon(s) ' + trimQty[1] + ' Qts\n',
               '* CEILING: ' + ceilingQty[0] + ' Gallon(s) ' + ceilingQty[1] + ' Qts\n'];
   }
   
   function calculateExternalWallQuantity(garage, area, windows, doors, btouchUp) {
    touchUp = rectifyTouchUpValue(btouchUp);
   
    if (garage > 0) {
    garage = garage * GARAGEDOOR_SURFACE_AREA;
    } else {
    garage = 0;
    }
   
    if (!(windows > 0)) {
    windows = 0;
    }
    if (!(doors > 0)) {
    doors = 0;
    }
   
    var extWallsQty = ((area * FOOTAGE_2_SURFACE_FACTOR) - (windows * WINDOW_SURFACE_AREA) - (doors * DOOR_SURFACE_AREA) - garage) * touchUp / SPREAD_RATE;
    var fractionalExtWallsQty = extWallsQty - Math.floor(extWallsQty);
   
    return calculatePaintQuantity(extWallsQty, fractionalExtWallsQty);
   }
   
   function calculateExternalTrimQuantity(garage, area, windows, doors, btouchUp) {
    touchUp = rectifyTouchUpValue(btouchUp);
   
    if (garage > 0) {
    if (garage == 1) {
    garage = GARAGEDOOR_1CAR_PERIMETER;
    }
    else if (garage == 2) {
    garage = GARAGEDOOR_2CAR_PERIMETER;
    }
    else {
    garage = GARAGEDOOR_3CAR_PERIMETER;
    }
    } else {
    garage = 0;
    }
   
    if (!(windows > 0)) {
    windows = 0;
    }
    if (!(doors > 0)) {
    doors = 0;
    }
   
    var trimQty = ((windows * WINDOW_PERIMETER) + Number(area) + (doors * DOOR_PERIMETER) + Number(garage)) * touchUp / SPREAD_RATE;
    var fractionalTrimQty = trimQty - Math.floor(trimQty);
   
    return calculatePaintQuantity(trimQty, fractionalTrimQty);
   }
   
   function calculateExternalGarageDoorQuantity(garage, btouchUp) {
    touchUp = rectifyTouchUpValue(btouchUp);
   
    if (garage > 0) {
    garage = garage * GARAGEDOOR_SURFACE_AREA;
    }
    else {
    garage = 0;
    }
   
    var garageQty = (garage) * touchUp / SPREAD_RATE;
    var fractionalGarageQty = garageQty - Math.floor(garageQty);
   
    return calculatePaintQuantity(garageQty, fractionalGarageQty);
   }
   
   function calculateExternalShuttersQuantity(shutters, btouchUp) {
    touchUp = rectifyTouchUpValue(btouchUp);
   
    var shuttersQty = (shutters * SHUTTERS_SURFACE_AREA) * touchUp / SPREAD_RATE;
    var fractionalShuttersQty = shuttersQty - Math.floor(shuttersQty);
   
    return calculatePaintQuantity(shuttersQty, fractionalShuttersQty);
   }
   
   
   function calculateExterior(subFormId) {
    var squareFeet = 0;
    var doors = 0;
    var garageDoors = 0;
    var windows = 0;
    var shutters = 0;
   
    var touchup = $("input[name='touchUp']:checked").val() === 'option1';
    bImperial = $("input[name='metrics']:checked").val() === 'option1';
   
    if (subFormId == 'custom') {
    if (bImperial) {
    squareFeet = $('#squareFeet').val();
    } else {
    squareFeet = toSqFt($('#squareFeet').val());
    }
   
    doors = $('#doorsCustom').val();
    garageDoors = $('#garageDoorsCustom').val();
    windows = $('#windowsCustom').val();
    shutters = $('#shuttersCustom').val();
    } else if (subFormId == "small") {
    squareFeet = 1300;
    doors = 1;
    garageDoors = 1;
    windows = 1;
    shutters = 2;
    } else if (subFormId == "medium") {
    squareFeet = 2500;
    doors = 2;
    garageDoors = 2;
    windows = 4;
    shutters = 8;
    } else if (subFormId == "large") {
    squareFeet = 4000;
    doors = 4;
    garageDoors = 3;
    windows = 8;
    shutters = 10;
    }
   
    var wallQty = calculateExternalWallQuantity(garageDoors, squareFeet, windows, doors, touchup);
    $('.wall-res.exterior-paint-results > td > div > span .gallon-value').text(wallQty[0]);
    $('.wall-res.exterior-paint-results > td > div > span .quart-value').text(wallQty[1]);
   
    var doorsQty = calculateDoorQuantity(doors, touchup);
    $('.doors-res.exterior-paint-results > td > div > span .gallon-value').text(doorsQty[0]);
    $('.doors-res.exterior-paint-results > td > div > span .quart-value').text(doorsQty[1]);
   
    var trimQty = calculateExternalTrimQuantity(garageDoors, squareFeet, windows, doors, touchup);
    $('.trim-res.exterior-paint-results > td > div > span .gallon-value').text(trimQty[0]);
    $('.trim-res.exterior-paint-results > td > div > span .quart-value').text(trimQty[1]);
   
    var shutterQty = calculateExternalShuttersQuantity(shutters, touchup);
    $('.shutters-res.exterior-paint-results > td > div > span .gallon-value').text(shutterQty[0]);
    $('.shutters-res.exterior-paint-results > td > div > span .quart-value').text(shutterQty[1]);
   
    var garageDoorsQty = calculateExternalGarageDoorQuantity(garageDoors, touchup);
    $('.garage-doors-res.exterior-paint-results > td > div > span .gallon-value').text(garageDoorsQty[0]);
    $('.garage-doors-res.exterior-paint-results > td > div > span .quart-value').text(garageDoorsQty[1]);
   
    calculationData.totalSize = squareFeet;
    calculationData.doors = doors;
    calculationData.windows = windows;
    calculationData.garageDoors = garageDoors;
    calculationData.shutters = shutters;
    if (touchup) {
    calculationData.touchUp = 'Y';
    } else {
    calculationData.touchUp = 'N';
    }
   
    calculationData.results = ['* WALL: ' + wallQty[0] + ' Gallon(s) ' + wallQty[1] + ' Qts\n',
                       '* DOORS: ' + doorsQty[0] + ' Gallon(s) ' + doorsQty[1] + ' Qts\n',
                       '* TRIM: ' + trimQty[0] + ' Gallon(s) ' + trimQty[1] + ' Qts\n',
                       '* SHUTTERS: ' + shutterQty[0] + ' Gallon(s) ' + shutterQty[1] + ' Qts\n',
                       '* GARAGE DOORS: ' + garageDoorsQty[0] + ' Gallon(s) ' + garageDoorsQty[1] + ' Qts\n'];
   }
   
   function calculateWoodStain(subFormId) {
    var length = 0;
    var width = 0;
    var sf = 0;
   
    if (subFormId == 'custom') {
    length = $('#woodStainLength').val();
    width = $('#woodStainWidth').val();
    sf = Number(length) * Number(width);
   
    $('#woodStainSF label.area-result').text(Math.round(Number(sf)));
    } else if (subFormId == "small") {
    sf = 200;
    } else if (subFormId == "medium") {
    sf = 500;
    } else if (subFormId == "large") {
    sf = 1000;
    }
   
    var solidWood = Math.ceil((sf / 300) + (sf / 600));
    var solidHouse = Math.ceil((sf / 300) + (sf / 375));
    var semiTransWood = Math.ceil((sf / 275) + (sf / 500));
    var transWood = Math.ceil((sf / 325) + (sf / 650));
    var deckover = Math.ceil(sf / 75);
   
    $('.deckover-stain-res.woodStain-paint-results > td > div > span .gallon-value').text(deckover * 2);
    $('.deckover-stain-res.woodStain-paint-results > td > div > span .per-coat').text("(" + deckover + " Gal/Coat)");
   
    $('.solid-stain-res.woodStain-paint-results > td > div > span .gallon-value').text(solidWood * 2);
    $('.solid-stain-res.woodStain-paint-results > td > div > span .per-coat').text("(" + solidWood + " Gal/Coat)");
   
    $('.hf-stain-res.woodStain-paint-results > td > div > span .gallon-value').text(solidHouse * 2);
    $('.hf-stain-res.woodStain-paint-results > td > div > span .per-coat').text("(" + solidHouse + " Gal/Coat)");
   
    $('.semi-transparent-stain-res.woodStain-paint-results > td > div > span .gallon-value').text(semiTransWood * 2);
    $('.semi-transparent-stain-res.woodStain-paint-results > td > div > span .per-coat').text("(" + semiTransWood + " Gal/Coat)");
   
    $('.transparent-stain-res.woodStain-paint-results > td > div > span .gallon-value').text(transWood * 2);
    $('.transparent-stain-res.woodStain-paint-results > td > div > span .per-coat').text("(" + transWood + " Gal/Coat)");
   
    calculationData.length = length;
    calculationData.width = width;
    calculationData.totalSize = sf;
   
    calculationData.results = ['Two (2) coats are recommended or required for this project. Quantities listed are based on two coats of coverage.\n',
                       '* DECKOVER STAIN: ' + (deckover * 2) + ' Gallon(s)\n',
                       '* SOLID COLOR WOOD STAIN: ' + (solidWood * 2) + ' Gallon(s)\n',
                       '* SOLID COLOR HOUSE & FENCE STAIN: ' + (solidHouse * 2) + ' Gallon(s)\n',
                       '* SEMI-TRANSPARENT WOOD STAIN: ' + (semiTransWood * 2) + ' Gallon(s)\n',
                       '* TRANSPARENT WOOD FINISHES: ' + (transWood * 2) + ' Gallon(s)\n'];
   }
   
   function toSqFt(sqmt) {
    return Number(sqmt * 10.764).toFixed(1);
   }
   
   function toSqMt(sqft) {
    return Number(sqft / 10.764).toFixed(1);
   }
   
   function toMeter(feet) {
    return Number(feet / 3.281).toFixed(1);
   }
   
   function toFeet(meter) {
    return Number(meter * 3.281).toFixed(1);
   }
   
   function calculateFloorCoatings(subFormId) {
    var length = 0;
    var width = 0;
    var sf = 0;
   
    if (subFormId == 'custom') {
    length = $('#floorCoatingsLength').val();
    width = $('#floorCoatingsWidth').val();
    sf = Number(length) * Number(width);
   
    $('#floorCoatingsSF label.area-result').text(Math.round(Number(sf)));
    } else if (subFormId == "small") {
    sf = 200;
    } else if (subFormId == "medium") {
    sf = 400;
    } else if (subFormId == "large") {
    sf = 800;
    }
   
    var porchPatioQty = Math.ceil(sf / 300 + sf / 600);
    var garageFloorQty = Math.ceil(sf / 300 + sf / 375);
    var concreteDyeQty = Math.ceil(sf / 275 + sf / 500);
    var concreteStain = Math.ceil(sf / 325 + sf / 650);
    var graniteGrip = Math.ceil(sf / 50);
   
    $('.porch-patio-floor-res.floorCoatings-paint-results > td > div > span .gallon-value').text(porchPatioQty);
    $('.porch-patio-floor-res.floorCoatings-paint-results > td > div > span .per-coat').text("(" + (porchPatioQty / 2).toFixed(1) + " Gal/Coat)");
   
    $('.concrete-garage-floor-res.floorCoatings-paint-results > td > div > span .gallon-value').text(garageFloorQty);
    $('.concrete-garage-floor-res.floorCoatings-paint-results > td > div > span .per-coat').text("(" + (garageFloorQty / 2).toFixed(1) + " Gal/Coat)");
   
    $('.concrete-dye-floor-res.floorCoatings-paint-results > td > div > span .gallon-value').text(concreteDyeQty);
    $('.concrete-dye-floor-res.floorCoatings-paint-results > td > div > span .per-coat').text("(" + (concreteDyeQty / 2).toFixed(1) + " Gal/Coat)");
   
    $('.granite-grip-floor-res.floorCoatings-paint-results > td > div > span .gallon-value').text(graniteGrip);
    $('.granite-grip-floor-res.floorCoatings-paint-results > td > div > span .per-coat').text("(" + (graniteGrip / 2).toFixed(1) + " Gal/Coat)");
   
    $('.concrete-stain-floor-res.floorCoatings-paint-results > td > div > span .gallon-value').text(concreteStain);
    $('.concrete-stain-floor-res.floorCoatings-paint-results > td > div > span .per-coat').text("(" + (concreteStain / 2).toFixed(1) + " Gal/Coat)");
   
    calculationData.length = length;
    calculationData.width = width;
    calculationData.totalSize = sf;
   
    calculationData.results = ['Two (2) coats are required for this project. Quantities listed are based on two coats of coverage.\n',
                           '* PORCH & PATIO FLOOR PAINT: ' + (porchPatioQty) + ' Gallon(s)\n',
                           '* CONCRETE & GARAGE FLOOR PAINT: ' + garageFloorQty + ' Gallon(s)\n',
                           '* CONCRETE DYE: ' + concreteDyeQty + ' Gallon(s)\n',
                           '* GRANITE GRIP: ' + graniteGrip + ' Gallon(s)\n',
                           '* CONCRETE STAIN: ' + concreteStain + ' Gallon(s)\n'];
   }
   
   function displayResults(formId, subFormId) {
    calculate(formId, subFormId);
    console.log('form - subform: ' + formId + " - " + subFormId);
   
    if (formId == 'interior') {
    $('thead > tr > th > small').text('');
    } else if (formId == 'exterior') {
    $('thead > tr > th > small').text('');
    } else if (formId == 'woodStain') {
    $('thead > tr > th > small').html('Two (2) coats are recommended or required for this project. <br/>Quantities listed are based on two coats of coverage.');
    } else if (formId == 'floorCoatings') {
    $('thead > tr > th > small').html('Two (2) coats are required for this project. <br/>Quantities listed are based on two coats of coverage.');
    }

   if(subFormId == 'custom'){
    $('.paint-results').removeClass('d-block').addClass('d-none');
    $('.calc-container').removeClass('d-none').addClass('d-block');
    $('.user-note').removeClass('d-block').addClass('d-none');
   } else{
    $('.paint-results').removeClass('d-none').addClass('d-block');
    $('.calc-container').removeClass('d-block').addClass('d-none');
    $('.user-note').removeClass('d-none').addClass('d-block');
   }

    $('.interior-paint-results').siblings().addClass('d-none');
    $('.' + formId + '-paint-results').removeClass('d-none');
   }
   
   function isValidEmail(email) {
    var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return (email != '' && emailRegex.test(email));
   }
   
   function getCalculationEmailData() {
    calculationData.projectType = selectedForm.toLowerCase();
    calculationData.preset = selectedSubForm;
    
    if (typeof calculationData.totalSize === 'undefined' && calculationData.projectType === 'interior'){
    calculationData.totalSize = calculationData.length * calculationData.width;
    }
    
    calculationData.totalSize = Number(calculationData.totalSize).toFixed(1);
    
    if (bImperial) {
    calculationData.unitOfMeasure = "imperial";
    } else {
    calculationData.unitOfMeasure = "metric";
    
    if (calculationData.preset !== 'custom') {
    calculationData.totalSize = Number(this.toSqMt(calculationData.totalSize)).toFixed(0);
   
    if (typeof calculationData.length !== 'undefined') {
    calculationData.length = Number(this.toMeter(calculationData.length)).toFixed(1);
    }
    if (typeof calculationData.width !== 'undefined') {
    calculationData.width = Number(this.toMeter(calculationData.width)).toFixed(1);
    }
    } else {
    if (calculationData.projectType === 'exterior') {
    calculationData.totalSize = Number(this.toSqMt(calculationData.totalSize)).toFixed(0);
    }
    }
    }
   
    return calculationData;
   }