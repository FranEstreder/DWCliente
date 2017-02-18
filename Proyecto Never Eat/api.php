<?php
require_once('lib/OAuth.php');

$DBservername = "137.74.50.41";
$DBusername = "root";
$DBpassword = "W2TnmvFx";
$DBdbname = "nevereat";

$CONSUMER_KEY = 'xREYcFw2yVbMl5OKVjgyJw';
$CONSUMER_SECRET = 'gt13M2ps_qbbhKe8SAwlUH_sMMs';
$TOKEN = '1beoyE1yfdHDefYGiamyCyhaDz2B56vw';
$TOKEN_SECRET = 'o-7hihcTRbZG1tmdYAZTDQJtVuM';

$DEFAULT_TERM = '';
$DEFAULT_LOCATION = '';

if (isset($_GET['method']))
{
    switch($_GET['method'])
    {
        case 'places':
            if (isset($_POST['tipo']))
                $DEFAULT_TERM = $_POST['tipo'];
            else
            {
                echo 'No tiene un tipo seleccionado';
                break;
            }

            if (isset($_POST['provincia']))
                $DEFAULT_LOCATION = $_POST['provincia'];
            else
            {
                echo 'No tiene una provincia seleccionada';
                break;
            }
            getPlaces();
        break;
        case 'login':
            $pass = "";
            if (isset($_POST['password']))
            {
                $pass = md5($_POST['password']);
            }
            else
            {
                echo 'Has de darme una contraseña';
                break;
            }

            $uname = "";
            if (isset($_POST['username']))
            {
                $uname = $_POST['username'];
            }
            else
            {
                echo 'Has de darme un usuario';
                break;
            }

            $mysqli = new mysqli($DBservername, $DBusername, $DBpassword, $DBdbname);
            if ($resultado = mysqli_query($mysqli, "SELECT username FROM users WHERE username = '".$uname."' AND password = '".$pass."'")) {
                if (mysqli_num_rows($resultado) >= 1)
                {
                    echo 'ok';
                }
                else
                {
                    echo 'nook';
                }
            }

        break;
        case 'register':

            $uname = "";
            if (isset($_POST['username']))
            {
                $uname = $_POST['username'];
            }
            else
            {
                echo 'Has de darme un usuario';
                break;
            }

            $name = "";
            if (isset($_POST['name']))
            {
                $name = $_POST['name'];
            }
            else
            {
                echo 'Has de darme un nombre';
                break;
            }

            $surname = "";
            if (isset($_POST['surname']))
            {
                $surname = $_POST['surname'];
            }
            else
            {
                echo 'Has de darme unos apellidos';
                break;
            }

            $mail = "";
            if (isset($_POST['mail']))
            {
                $mail = $_POST['mail'];
            }
            else
            {
                echo 'Has de darme un correo electrónico';
                break;
            }

            $pass = "";
            if (isset($_POST['password']))
            {
                $pass = md5($_POST['password']);
            }
            else
            {
                echo 'Has de darme una contraseña';
                break;
            }

            $mysqli = new mysqli($DBservername, $DBusername, $DBpassword, $DBdbname);
            if (mysqli_query($mysqli, "INSERT INTO users (username,password,name,surname,email) VALUES ('".$uname."', '".$pass."', '".$name."', '".$surname."', '".$mail."');") === TRUE) 
            {
                echo 'ok';
            }
            else
            {
                echo 'nook';
            }
        break;
        default:
        echo "El metodo introducido no es valido";
        break;
    }
}
else
    echo 'No puedes hacer consultas sin metodo.';

function getPlaces () {
    $url_params = array();
    
    $url_params['category_filter'] = $GLOBALS['DEFAULT_TERM'];
    $url_params['location'] = $GLOBALS['DEFAULT_LOCATION'];
    
    $url_params['sort'] = 1;
    $url_params['radius_filter'] = 40000;
    

    $token = new OAuthToken($GLOBALS['TOKEN'], $GLOBALS['TOKEN_SECRET']);
    $consumer = new OAuthConsumer($GLOBALS['CONSUMER_KEY'], $GLOBALS['CONSUMER_SECRET']);
    $signature_method = new OAuthSignatureMethod_HMAC_SHA1();
    $unsigned_url = "https://api.yelp.com/v2/search/". "?" . http_build_query($url_params);
    
    $oauthrequest = OAuthRequest::from_consumer_and_token(
        $consumer, 
        $token, 
        'GET', 
        $unsigned_url
    );

    $oauthrequest->sign_request($signature_method, $consumer, $token);
    $signed_url = $oauthrequest->to_url();

    try {
        $ch = curl_init($signed_url);
        if (FALSE === $ch)
            throw new Exception('Failed to initialize');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $data = curl_exec($ch);
        if (FALSE === $data)
            throw new Exception(curl_error($ch), curl_errno($ch));
        $http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        if (200 != $http_status)
            throw new Exception($data, $http_status);
        curl_close($ch);
    } catch(Exception $e) {
        trigger_error(sprintf(
            'Curl failed with error #%d: %s',
            $e->getCode(), $e->getMessage()),
            E_USER_ERROR);
    }
    
    echo $data;
}
?>