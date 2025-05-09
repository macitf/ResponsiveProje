

$(document).ready(function() {
 
  const styleElement = $('<style id="theme-styles"></style>');
  $('head').append(styleElement);
  
 
  const isCreamTheme = localStorage.getItem('creamTheme') === 'true';
  
  
  const themeToggle = $('<li id="theme-toggle-container"><a href="javascript:void(0)" id="theme-toggle"><span class="theme-icon light-icon">☀️</span><span class="theme-icon cream-icon">🍦</span></a></li>');
  $('header nav ul').append(themeToggle);
  
  
  const lightThemeStyles = `
    :root {
      --bg-color: #f5f5f5;
      --text-color: #333;
      --header-bg: #333;
      --header-text: #fff;
      --container-bg: #fff;
      --border-color: #ddd;
      --button-bg: #4CAF50;
      --button-text: white;
      --button-hover: #45a049;
      --input-bg: #fff;
      --table-header-bg: #f5f5f5;
      --table-border: #ddd;
      --footer-bg: #333;
      --footer-text: white;
      --admin-bg: #FFF8E1;
      --admin-border: #FFE082;
      --admin-badge-bg: #FB8C00;
    }
  `;
  
  const creamThemeStyles = `
    :root {
      --bg-color: #FFF9E6;
      --text-color: #5D4037;
      --header-bg: #D7CCC8;
      --header-text: #4E342E;
      --container-bg: #FFFBF0;
      --border-color: #E6DED2;
      --button-bg: #D4A56A;
      --button-text: #3E2723;
      --button-hover: #BC8F5E;
      --input-bg: #FFF8E8;
      --table-header-bg: #F5E9D4;
      --table-border: #E6DED2;
      --footer-bg: #D7CCC8;
      --footer-text: #4E342E;
      --admin-bg: #FFF8E1;
      --admin-border: #FFE082;
      --admin-badge-bg: #FB8C00;
    }
    
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
    }
    
    header {
      background-color: var(--header-bg);
      color: var(--header-text);
    }
    
    .contact-container, .score-container, .about-container, #quiz-container, .form-container {
      background-color: var(--container-bg);
      border-color: var(--border-color);
    }
    
    input, textarea, select {
      background-color: var(--input-bg);
      color: var(--text-color);
      border-color: var(--border-color);
    }
    
    button, .btn {
      background-color: var(--button-bg);
      color: var(--button-text);
    }
    
    button:hover, .btn:hover {
      background-color: var(--button-hover);
    }
    
    table, th, td {
      border-color: var(--table-border);
    }
    
    th {
      background-color: var(--table-header-bg);
    }
    
    footer {
      background-color: var(--footer-bg);
      color: var(--footer-text);
    }
    
    /* Tema değiştirme butonu stilleri */
    #theme-toggle-container {
      margin-left: 15px;
    }
    
    #theme-toggle {
      display: inline-block;
      text-decoration: none;
    }
    
    .theme-icon {
      font-size: 20px;
    }
    
    .light-icon {
      display: ${isCreamTheme ? 'none' : 'inline-block'};
    }
    
    .cream-icon {
      display: ${isCreamTheme ? 'inline-block' : 'none'};
    }
    
    /* Admin panel göstergeleri */
    .admin-badge {
      background-color: var(--admin-badge-bg);
      color: white;
      padding: 5px 10px;
      border-radius: 10px;
      font-size: 12px;
      margin-left: 10px;
    }
    
    .admin-controls {
      background-color: var(--admin-bg);
      border: 1px solid var(--admin-border);
      padding: 10px;
      margin: 10px 0;
      border-radius: 5px;
    }
  `;
  

  applyTheme(isCreamTheme);
  

  $('#theme-toggle').on('click', function(e) {
    e.preventDefault();
    const currentTheme = localStorage.getItem('creamTheme') === 'true';
    const newTheme = !currentTheme;
    
    applyTheme(newTheme);
    localStorage.setItem('creamTheme', newTheme);
  });
  

  function applyTheme(isCream) {
    if (isCream) {
      $('#theme-styles').html(lightThemeStyles + creamThemeStyles);
      $('.light-icon').hide();
      $('.cream-icon').show();
    } else {
      $('#theme-styles').html(lightThemeStyles);
      $('.light-icon').show();
      $('.cream-icon').hide();
    }
  }
}); 