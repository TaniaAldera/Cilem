/* ============================================================
   Simulasi Cicil Emas — script.js
   Pegadaian Cabang Mayang Mangurai
   ============================================================ */

const hargaEmas = {
    0.5:  1509000,
    1:    2879000,
    2:    5687000,
    5:    14113000,
    10:   28150000,
    25:   69997000,
    50:   139883000,
    100:  279629000,
    250:  967354000,
    500:  1394707000,
    1000: 2798412000
};

const adminFee = 50000;
const dpRate   = 0.15;
const tenors   = [3, 6, 12, 18, 24, 36];
const denoms   = [0.5, 1, 2, 5, 10, 25, 50, 100, 250, 500, 1000];

let currentMargin = 0.0092;

function formatIDR(num) {
    return Math.floor(num).toLocaleString('id-ID');
}

function switchMargin(val, btn) {
    currentMargin = val;
    document.querySelectorAll('.tab-btn').forEach(function(b) {
        b.classList.remove('active');
    });
    btn.classList.add('active');
    renderTable();
}

function renderTable() {
    var tbody = document.getElementById('simulation-table');
    tbody.innerHTML = '';

    denoms.forEach(function(d) {
        var tunai      = hargaEmas[d];
        var dpMurni    = tunai * dpRate;
        var totalDP    = dpMurni + adminFee;
        var pinjaman   = tunai - dpMurni;
        var bungaBulan = tunai * currentMargin;

        var row  = document.createElement('tr');
        var html = '<td>' + (d < 1 ? '0,5' : d) + ' Gram</td>'
                 + '<td>' + formatIDR(totalDP)  + '</td>'
                 + '<td class="val-pinjaman">' + formatIDR(pinjaman) + '</td>';

        tenors.forEach(function(tenor) {
            var angsuran = (pinjaman / tenor) + bungaBulan;
            html += '<td>' + formatIDR(angsuran) + '</td>';
        });

        row.innerHTML = html;
        tbody.appendChild(row);
    });
}

/* Set tanggal otomatis */
function setTanggal() {
    var options = { day: 'numeric', month: 'long', year: 'numeric' };
    document.getElementById('date-display').innerText =
        'Update: ' + new Date().toLocaleDateString('id-ID', options);
}

/* Init */
setTanggal();
renderTable();
