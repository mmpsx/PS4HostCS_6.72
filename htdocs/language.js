function french() {
  var french = document.getElementById("lang");
  french.innerHTML =
    "<h3>LISEZ ATTENTIVEMENT CE DOCUMENT AVANT DE PROCÉDER</h3><br>" +
    "<p><b>Cela fonctionne UNIQUEMENT sur FW 6.72. Si vous utilisez un firmware inférieur, téléchargez un fichier de" +
    'mise à jour 6.72 <a href="https://sce.party/firmwares">ici</a> et mettez à jour votre système. Si vous' +
    "utilisez un firmware supérieur (par exemple 7.02), votre console ne peut pas encore être piratée.</b>" +
    "</p>" +
    "<p>Cet exploit se compose de deux étapes: le jailbreak réel (JB) et Mira + HEN (MIRA) pour <s>jeux piratés</s>" +
    "exécutez le logiciel homebrew, vous devez d'abord activer JB, puis MIRA. Pas seulement l'un d'entre eux, pas" +
    "l'inverse. <b>D'abord JB puis MIRA.</b></p>" +
    "<ol>" +
    "<li>Cliquez sur le lien qui dit Jailbreak. Dans environ 20 secondes, vous recevrez: Votre PS4 est maintenant" +
    "Jailbreak jusqu'au prochain redémarrage.Patientez jusqu'à la notification \"Mémoire système" +
    "insuffisante\". Cela signifie que tout s'est bien passé.<br />" +
    "Si quelque chose ne va pas pendant le processus, vous pouvez recevoir une alerte indiquant «Le jailbreak" +
    "a échoué! Cliquez sur Fermer le Navigateur, redémarrez votre PS4 et réessayez..». Dans ce cas, vous" +
    "devez redémarrer votre PS4, de préférence sans fermer la boîte de dialogue.<br />" +
    "Si le système se bloque pendant plus d'une minute (peut nécessiter plus de temps sur des connexions" +
    "Internet lentes), redémarrez votre PS4 et réessayez.<br />" +
    "Si le système tombe en panne (ressemble à une mise hors tension instantanée), appuyez sur le bouton" +
    "d'alimentation de la PS4 (PAS sur la manette de jeu) à deux reprises jusqu'à ce qu'il se rallume, puis" +
    "réessayez." +
    "</li>" +
    '<li>Après avoir cliqué sur OK sur "Il n\'y a pas assez de mémoire système libre" et que la page se recharge,' +
    'cliquez sur le lien qui dit MIRA. Cela activera Mira + HEN pour déverrouiller le menu "Paramètres de' +
    'débogage". Dans environ 20 secondes, vous recevrez une alerte disant "Tout est prêt!", Suivie de "Il n\'y' +
    "a pas assez de mémoire système disponible\". Cela signifie que tout s'est bien passé.<br />" +
    "Si le système se bloque ou tombe en panne, voir ci-dessus.</li>" +
    "<li><b>For advanced users:</b> To load your own payloads using NetCat, run first JB then NETCAT and send the" +
    "payload to TCP port 9020.</li>" +
    "</ol><br>" +
    "<p><i>L'exploit Jailbreak ne s'opère qu'une fois par redémarrage de la console.Si vous souhaitez utiliser" +
    "Binloader l'opération nécessite les étapes:</i></p>" +
    "<ol><br>" +
    "<li>1) Jailbreack</li>" +
    "<li>2) Binloader</li>" +
    '<li>3) Lors de l\'alerte de confirmation cliquez sur "OK" et ne quittez plus votre navigateur pour envoyer vos payloads</li>' +
    "<i>Si vous quittez le navigateur par erreur il vous faudra relancez Binloader(sans le Jailbreak)</i>" +
    "</ol>" +
    "<p><i>Si vous voulez utiliser Binloader puis Netcat il vous faudra relancer votre Navigateur entre les deux utilisations.(sans relancez le Jailbreak)</i></p>" +
    "<p><i><b>Concernant le Payload FTP vous obtiendrez un temps d'attente après l'injection jusqu'au message de rechargement de page. Cliquez sur OK et vous pourrez profiter.</b></i></p>";
}
function english() {
  var english = document.getElementById("lang");
  english.innerHTML =
    "<h3>READ THIS CAREFULLY BEFORE PROCEEDING</h3><br>" +
    "<p><b>It works ONLY on FW 6.72. If you are using lower firmware, download a file of" +
    'update 6.72 <a href="https://sce.party/firmwares">here</a> and update your system. If you ' +
    "use a higher firmware (for example 7.02), your console cannot be hacked yet. </b>" +
    "</p>" +
    "<p>This exploit consists of two stages: the actual jailbreak (JB) and Mira + HEN (MIRA) for <s> pirated games </s> " +
    "run homebrew software, you need to activate JB first, then MIRA. Not just one of them, not " +
    "the reverse. <b> First JB then MIRA. </b></p>" +
    "<ol>" +
    "<li> Click on the link that says Jailbreak. In about 20 seconds you will receive: Your PS4 is now " +
    'Jailbreak until next reboot. Wait until notification "Insufficient system memory ' +
    'This means that everything went well. <br /> ' +
    'If something goes wrong during the process, you may receive an alert saying "The jailbreak ' +
    'failed! Click on Close Browser, restart your PS4 and try again..." In this case, you ' +
    "must restart your PS4, preferably without closing the dialog. <br />" +
    "If the system hangs for more than a minute (may take longer on connections" +
    "Internet slow), restart your PS4 and try again. <br />" +
    "If the system crashes (looks like an instant power off), press the" +
    "button power on the PS4 (NOT on the gamepad) twice until it turns on again, then" +
    "try again." +
    "</li>" +
    '<li>After clicking OK on "There is not enough free system memory" and the page reloads,' +
    'click on the link that says MIRA. This will activate Mira + HEN to unlock the "Settings menu' +
    'debugging ". In about 20 seconds you will receive an alert saying" Everything is ready! ", followed by" There is no ' +
    'has not enough system memory available. "This means that everything has gone well. <br />' +
    "If the system hangs or crashes, see above. </li>" +
    "<li> <b> For advanced users: </b> To load your own payloads using NetCat, run first JB then NETCAT and send the" +
    "payload to TCP port 9020. </li>" +
    "</ol><br>" +
    "<p><i>Jailbreak exploit only happens once per console restart, if you want to use " +
    "Binloader operation requires the steps:</i></p>" +
    "<ol><br>" +
    "<li>1) Jailbreack</li>" +
    "<li>2) Binloader</li>" +
    '<li>3) During the confirmation alert click on  "OK " and do not quit your browser to send your payloads </li> ' +
    "<i> If you quit the browser by mistake you will have to restart Binloader (without the Jailbreak)</i>" +
    "</ol>" +
    "<p><i>If you want to use Binloader then Netcat you will have to restart your Browser between the two uses (without restarting the Jailbreak)</i></p>" +
    "<p><i><b>Regarding the FTP Payload you will get a waiting time after the injection until the page reload message. Click OK and you can enjoy.</b></i></p>";
}
function italian() {
  var italian = document.getElementById("lang");
  italian.innerHTML =
    "<h3>LEGGERE ATTENTAMENTE QUESTO DOCUMENTO PRIMA DI PROCEDERE</h3><br>" +
    "<p><b>Funziona SOLO su AI 6.72. Se si utilizza un firmware inferiore, scaricare un file da" +
    'aggiornamento 6.72<a href="https://sce.party/firmwares">qua</a> e aggiorna il tuo sistema. Se tu' +
    "usa un firmware più alto (es. 7.02), la tua console non può ancora essere hackerata.</b>" +
    "</p>" +
    "<p>Questo exploit consiste in due fasi: l'effettivo jailbreak (JB) e Mira + HEN (MIRA) per <s> giochi piratati </s> " +
    "esegui il software homebrew, devi prima attivare JB, poi MIRA. Non solo uno di loro, non " +
    "il contrario. <b> Prima JB poi MIRA.</b></p>" +
    "<ol>" +
    "<li>Fai clic sul collegamento che dice il jailbreak. In circa 20 secondi riceverai: la tua PS4 è ora " +
    'Jailbreak fino al prossimo riavvio. Attendere fino a notifica "Memoria di sistema' +
    'insufficiente". Ciò significa che tutto è andato bene. <br /> ' +
    'Se qualcosa va storto durante il processo, potresti ricevere un avviso che dice "Il jailbreak ' +
    'Fallito! Fai clic su Chiudi browser, riavvia la PS4 e riprova ...". In questo caso, tu ' +
    "deve riavviare la tua PS4, preferibilmente senza chiudere la finestra di dialogo. <br />" +
    "Se il sistema si blocca per più di un minuto (potrebbe richiedere più tempo sulle connessioni" +
    "Internet lento), riavvia la PS4 e riprova. <br /> " +
    "Se il sistema si arresta in modo anomalo (sembra uno spegnimento immediato), premere il pulsante" +
    "accendi la PS4 (NON sul gamepad) due volte fino a quando non si riaccende, quindi" +
    "riprova." +
    "</li>" +
    '<li>Dopo aver fatto clic su OK su "Memoria di sistema libera insufficiente" e la pagina viene ricaricata,' +
    'fai clic sul link che dice MIRA. Ciò attiverà Mira + HEN per sbloccare il "menu Impostazioni' +
    "debugging\". In circa 20 secondi riceverai un avviso che dice Tutto è pronto!, seguito da Non c'è" +
    "non dispone 'di memoria di sistema sufficiente'. Ciò significa che tutto è andato bene. <br />" +
    "Se il sistema si blocca o non funziona, vedere sopra.</li>" +
    "<li><b>For advanced users:</b> To load your own payloads using NetCat, run first JB then NETCAT and send the" +
    "payload to TCP port 9020.</li>" +
    "</ol><br>" +
    "<p><i>L'exploit di jailbreak si verifica solo una volta per riavvio della console, se si desidera utilizzare " +
    "Operazione binloader richiede i passaggi:</i></p>" +
    "<ol><br>" +
    "<li>1) Jailbreack</li>" +
    "<li>2) Binloader</li>" +
    '<li>3) Durante l\'avviso di conferma, fai clic su "OK" e non chiudere il browser per inviare i tuoi payload </li> ' +
    "<i> Se si esce dal browser per errore, sarà necessario riavviare Binloader (senza il jailbreak)</i>" +
    "</ol>" +
    "<p><i>Se si desidera utilizzare Binloader, Netcat dovrà riavviare il browser tra i due usi. (Senza riavviare il jailbreak) </i> </p> " +
    "<p> <i> <b> Per quanto riguarda il Payload FTP, dopo l'iniezione si otterrà un tempo di attesa fino al messaggio di ricarica della pagina. Fai clic su OK e puoi divertirti. </b> </i> </p> ";
}
