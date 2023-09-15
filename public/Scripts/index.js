const _next_page_btn_element = document.getElementById('next-page-btn');
const _second_page_title = document.getElementById('watch-vault-page-title');
const _clock_displayer = document.getElementById('clock-displayer');
const _add_watch_vault_button = document.getElementById('add-watch-vault-button');
const _watch_vault_page = document.getElementById('watch-vault-page');
const _watch_page_content = document.getElementById('watch-page-content');


const _SECONDS_TO_REFRESH_TIME = 25;

let _current_time = new Date();
let _seconds_without_refresh_time = 0;
let _clock_is_24_hours = true;
let _is_add_watch_vault_button_hidden = true;


_next_page_btn_element.addEventListener('click', _next_page_btn_on_click);
_clock_displayer.addEventListener('click', _clock_displayer_on_click);
_watch_vault_page.addEventListener('mouseenter', _watch_vault_page_on_mouse_enter);
_watch_page_content.addEventListener('mouseenter', _watch_page_content_on_mouse_enter);


setInterval(_1_second_interval, 1000);


function _next_page_btn_on_click(){
    _second_page_title.scrollIntoView({behavior: 'smooth'});
}

function _clock_displayer_on_click(){
    _clock_is_24_hours = !_clock_is_24_hours;
    _display_current_time();
}

function _watch_vault_page_on_mouse_enter(){
    _show_add_watch_vault_button();
}

function _watch_page_content_on_mouse_enter(){
    _hide_add_watch_vault_button();
}


function _1_second_interval(){
    _update_current_time();
    _display_current_time();
}

function _update_current_time(){
    if (_seconds_without_refresh_time <= _SECONDS_TO_REFRESH_TIME){
        _current_time.setSeconds(_current_time.getSeconds() + 1);
        _seconds_without_refresh_time += 1;
    }else{
        _current_time = new Date();
        _seconds_without_refresh_time = 0;
    }
}

function _display_current_time(){
    let time_parsed_to_display = _clock_is_24_hours? _parse_current_time_as_24_hours() : _parse_current_time_as_normal();

    _clock_displayer.textContent = time_parsed_to_display;
}

function _parse_current_time_as_24_hours(){
    let hours = _current_time.getHours();
    let minutes = _current_time.getMinutes();
    let seconds = _current_time.getSeconds();

    hours = _two_size_digit(hours);
    minutes = _two_size_digit(minutes);
    seconds = _two_size_digit(seconds);
    
    return `${hours}:${minutes}:${seconds}`;
}

function _parse_current_time_as_normal(){
    let hours = _current_time.getHours();
    let parsed_hours = _trim_24_hours_to_12(hours);
    let minutes = _current_time.getMinutes();
    let seconds = _current_time.getSeconds();
    let pm_or_am = hours >= 12? 'PM' : 'AM';


    parsed_hours = _two_size_digit(parsed_hours);
    minutes = _two_size_digit(minutes);
    seconds = _two_size_digit(seconds);

    return `${parsed_hours}:${minutes}:${seconds} ${pm_or_am}`;
}

function _trim_24_hours_to_12(hour){
    if (hour <= 0){
        return 12;
    }else if(hour <= 12){
        return hour;
    }else{
        return hour - 12;
    }
}

function _two_size_digit(digit){
    return digit < 10? `0${digit}` : digit.toString();
}

function _show_add_watch_vault_button(){
    _add_watch_vault_button.className = 'add-watch-vault-button-visible';
}

function _hide_add_watch_vault_button(){
    _add_watch_vault_button.className = 'add-watch-vault-button-hidden';
}
