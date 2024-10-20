const speed_row = document.getElementById('speed').children;
let speed = 3000;
const time_row = document.getElementById('time').children;
let time = 10;
let current_time = 0;
const range_row = document.getElementById('range').children;
const vowels = [1, 5, 9, 15, 21];
const all_chars = Array.from({ length: 26 }, (x, i) => i + 1);
let character_selection = all_chars;

function deselect_row(row) {
    [].forEach.call(row, function (deselect) {
        deselect.classList.remove('selected')
    });
}

function speed_select(btn_id, milliseconds) {
    deselect_row(speed_row);
    speed = milliseconds;
    document.getElementById(btn_id).classList.add('selected');
}

function time_select(btn_id, minutes) {
    deselect_row(time_row);
    if (minutes < 0) {
        minutes = prompt("Please enter your custom time:", time);
    }
    time = minutes;
    document.getElementById(btn_id).classList.add('selected');
}

function range_select(btn_id) {
    deselect_row(range_row);
    switch (btn_id) {
        case 'vowels':
            character_selection = vowels;
            break;
        case 'custom_range':
            alert("Coming soon!");
            character_selection = all_chars;
            break;
        default:
            character_selection = all_chars;
    }
    document.getElementById(btn_id).classList.add('selected');
}

function start_stop(el) {
    switch (el.classList[2]) {
        case 'start':
            el.classList.remove('start');
            el.classList.add('stop');
            el.innerHTML = 'stop';
            document.getElementById('controls').style.display = 'none';
            document.getElementById('cards').style.display = 'flex';
            current_time = 0;
            question_timer();
            qt = setInterval(question_timer, speed * 2);
            break;
        case 'stop':
            clearInterval(qt);
            el.classList.remove('stop');
            el.classList.add('start');
            el.innerHTML = 'start';
            document.getElementById('controls').style.display = 'flex';
            document.getElementById('cards').style.display = 'none';
            break;
    }
}

function gen_random_card(range) {
    let rand = Math.floor(Math.random() * range);
    let img = "signs/" + character_selection[rand] + ".svg";
    let chr = String.fromCharCode(64 + character_selection[rand]);
    return [chr, img];
}

function question_timer() {
    if (current_time >= mins_to_ms(time)) {
        clearInterval(qt);
        start_stop(document.getElementById('start_stop_btn'));
        return;
    }
    card = gen_random_card(character_selection.length);
    hs = document.getElementById('hand_sign');
    hs.style.visibility = 'hidden'
    hs.src = card[1]
    document.getElementById('letter').innerHTML = card[0];
    setTimeout(() => hs.style.visibility = 'visible', speed);
    current_time += speed;
}

function mins_to_ms(mins) {
    return mins * 60000;
}
