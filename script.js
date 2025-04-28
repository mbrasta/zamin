// شبیه‌سازی زلزله‌ها بر اساس شدت
function simulateEarthquake(magnitude) {
    let effectText = `زلزله با شدت ${magnitude} ریشتر!`;
    
    // تغییر متن و ظاهر صفحه بر اساس شدت زلزله
    let effectDiv = document.getElementById('earthquake-effect');
    effectDiv.innerHTML = effectText;
    effectDiv.style.backgroundColor = 'lightcoral';  // تغییر رنگ پس‌زمینه
    
    // می‌توانید اثرات بیشتری اضافه کنید، مانند تکان‌های صفحه، صدا، و غیره
  }
  
  // دریافت داده‌های زلزله‌های اخیر ایران از API
  async function fetchEarthquakeData() {
    try {
      const response = await fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
      const data = await response.json();
      
      // فیلتر کردن داده‌ها برای زلزله‌های ایران
      const iranEarthquakes = data.features.filter(item => item.properties.place.includes('Iran'));
      
      // نمایش داده‌ها در جدول
      const tableBody = document.getElementById('earthquake-data').getElementsByTagName('tbody')[0];
      iranEarthquakes.forEach(earthquake => {
        const row = tableBody.insertRow();
        const timeCell = row.insertCell(0);
        const placeCell = row.insertCell(1);
        const magnitudeCell = row.insertCell(2);
  
        timeCell.textContent = new Date(earthquake.properties.time).toLocaleString();
        placeCell.textContent = earthquake.properties.place;
        magnitudeCell.textContent = earthquake.properties.mag;
      });
    } catch (error) {
      console.error('خطا در دریافت داده‌ها:', error);
    }
  }
  
  // بارگذاری داده‌ها هنگام بارگذاری صفحه
  document.addEventListener('DOMContentLoaded', fetchEarthquakeData);
  