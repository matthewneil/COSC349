Vagrant.configure("2") do |config|

	#Timezone Web Server
	config.vm.define "webserver" do |webserver|
		webserver.vm.hostname = "webserver-tz"
		webserver.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"
		webserver.vm.network "private_network", ip: "192.168.2.11"
		webserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]
		webserver.vm.provision "shell", inline: <<-SHELL
		 	apt-get update
      			apt-get install -y apache2 php libapache2-mod-php php-mysql
      			cp /vagrant/test-website.conf /etc/apache2/sites-available/
      			a2ensite test-website    
      			a2dissite 000-default
      			service apache2 reload
    		SHELL
	end

	config.vm.box = "ubuntu/xenial64"
	config.vm.define "dbserver" do |dbserver|
    
	dbserver.vm.hostname = "dbserver-tz"
    
    dbserver.vm.network "private_network", ip: "192.168.2.12"
    dbserver.vm.synced_folder ".", "/vagrant", owner: "vagrant", group: "vagrant", mount_options: ["dmode=775,fmode=777"]
    
    dbserver.vm.provision "shell", inline: <<-SHELL
      apt-get update
      export MYSQL_PWD='rootQuack1nce4^'
      echo "mysql-server mysql-server/root_password password $MYSQL_PWD" | debconf-set-selections 
      echo "mysql-server mysql-server/root_password_again password $MYSQL_PWD" | debconf-set-selections
      apt-get -y install mysql-server
      echo "CREATE DATABASE timezones;" | mysql
      echo "CREATE USER 'webuser'@'%' IDENTIFIED BY 'Quack1nce4^';" | mysql
      echo "GRANT ALL PRIVILEGES ON timezones.* TO 'webuser'@'%'" | mysql
      export MYSQL_PWD='Quack1nce4^'
      cat /vagrant/database-tz-setup.sql | mysql -u webuser timezones
      #sed -i'' -e '/bind-address/s/127.0.0.1/0.0.0.0/' /etc/mysql/mysql.conf.d/mysqld.cnf
      service mysql restart
    SHELL
  end

end
