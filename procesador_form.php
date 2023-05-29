<?PHP 

$Nombre = $_POST ['nombre'];
$Apellido = $_POST ['apellido'];
$Email = $_POST ['email'];
$telefono = $_POST ['telefono'];


    echo "<pre>";
print_r(
    "<div>
    <h3> Tus datos han sido enviados. Debajo te mostramos lo que has enviado. Muchas gracias! </h3>
    <ul>
        <li> $Nombre </li>
        <li> $Apellido </li>
        <li> $Email </li>
        <li> $telefono </li>
    </ul>
    </div>
    "
);
echo "</pre>";


