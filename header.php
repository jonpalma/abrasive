<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="shortcut icon" type="img/png" href="img/favicon.ico"/>
        <link rel="stylesheet" href="css/bootstrap.min.css">
        <link rel="stylesheet" href="style.css">
        <title>Abrasive Solutions</title>
    </head>
    <body>
        <nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a href="<?php if($page != 'index') { echo 'index.php'; }?>#index" class="smoothScroll nav-logo">
                        <img src="img/logo/logo.png" alt="logo">
                    </a>
                </div>
                <div class="collapse navbar-collapse" id="navbar-collapse">
                    <ul class="nav navbar-nav">
                        <li><a href="<?php if($page != 'index') { echo 'index.php'; }?>#index" class="smoothScroll vertical-align nav-padd">Inicio</a></li>
                        <li><a href="<?php if($page != 'index') { echo 'index.php'; }?>#empresa" class="smoothScroll vertical-align nav-padd">Empresa</a></li>
                        <li><a href="<?php if($page != 'index') { echo 'index.php'; }?>#productos" class="smoothScroll vertical-align nav-padd">Productos</a></li>
                        <li><a href="<?php if($page != 'index') { echo 'index.php'; }?>#servicios" class="smoothScroll vertical-align nav-padd">Servicios</a></li>
                        <li><a href="<?php if($page != 'index') { echo 'index.php'; }?>#contacto" class="smoothScroll vertical-align nav-padd">Contacto</a></li>
                    </ul>
                </div>
            </div>
        </nav>