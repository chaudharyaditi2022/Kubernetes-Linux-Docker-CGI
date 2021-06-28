function RunCommand(event){
    var key = event.keyCode || event.which;
    if (key == 13 || key==1){
        //alert("hello");
		var cmd = document.getElementById("cmd").value;
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "http://192.168.1.39/cgi-bin/linux.py?cmd="+cmd, true);
		xhr.send();
		xhr.onload = function(){
			if(xhr.readyState == 4 && xhr.status == 200) {
			var output = xhr.responseText;
			document.getElementById("output").innerHTML = output;
			}
		}	
    }
}

function KubernetesTask(){
	var key = event.keyCode || event.which;
    if (key == 13 || key==1){
        //alert("hello");
		var task = document.getElementById("task").value.toLowerCase();
		var cmd = "";
		var output = "";
		//alert(task);
		if (( task.includes("create") || task.includes("launch") || task.includes("run")) && (task.includes("pod") || task.includes("deployment"))){
			var resource = task.includes("pod")? "" : "deployment";
			var operation = resource==""? "run" : "create";
			var name = prompt(`Enter ${resource} name : `);
			var image = prompt("Enter Image Name : ");
			if (name == null || name == "" || image == null || image == ""){
				alert("Sorry, Values not provided!!");
				return ""
			}
			cmd = `kubectl ${operation} ${resource} ${name} --image=${image}`;
			//alert(cmd);
		}
		else if(task.includes("get") || task.includes("show")){

			var resource = "";
			var name = "";
			if (task.includes("pod"))
				resource = "pod";
			else if	(task.includes("deployment"))
				resource = "deployment";	
			else if	(task.includes("service"))
				resource = "service";
			else if	(task.includes("replication controller") || task.includes("replicationcontroller"))
				resource = "rc";
			else
				output = "Sorry!! Cannot Process your Request!!"
			if (resource != "")
				if (confirm(`Do you want see information of a specific ${resource}?`)){
					name = prompt(`Enter ${resource} name : `);
				}
			cmd = `kubectl get ${resource} ${name}`
		}
		else if(task.includes("delete") || task.includes("remove")){
			if (task.includes("pod"))
				resource = "pod";
			else if	(task.includes("deployment"))
				resource = "deployment";	
			else if	(task.includes("service"))
				resource = "service";
			else if	(task.includes("replication controller") || task.includes("replicationcontroller"))
				resource = "rc";
			else if (task.includes("everything") || task.includes("whole") || task.includes("all resource") || task.includes("environment"))
				resource = "all"
			else
				output = "Sorry!! Cannot Process your Request!!"
			
			

			if (resource != ""){
				if(resource != "all"){
				if (confirm(`Do you want to delete a  specific ${resource}`)){
					var name = prompt(`Enter ${resource} name : "`);
					cmd = `kubectl delete ${resource} ${name}`
				}
				}		
				else 
					cmd = `kubectl delete ${resource} --all`	
			}

		}
		else if(task.includes("expose")){
			var name = "";
			if (task.includes("pod"))
				resource = "pod";
			else if	(task.includes("deployment"))
				resource = "deployment";	
			else if	(task.includes("service"))
				resource = "service";
			else if	(task.includes("replication controller") || task.includes("replicationcontroller"))
				resource = "rc";
			else
				output = "Sorry!! Cannot Process your Request!!"

			if (resource != "" ){
				name = prompt(`Enter ${resource} name : `);
				var service_port =  prompt("Enter service port : ");
				cmd = `kubectl expose ${resource} ${name} --type=NodePort --port ${service_port}`;
			}
			
		}
		else{
			output = "Sorry!! Cannot Process your Request!!"
			document.getElementById("output").innerHTML = output;
		}

		if(cmd != "" && output == ""){
			
		
			var xhr = new XMLHttpRequest();
			xhr.open("GET", "http://13.232.110.199/cgi-bin/kubernetes.py?cmd="+cmd, true)
			xhr.send();
			xhr.onload = function(){
				if (xhr.readyState == 4 && xhr.status == 200){
					output = xhr.responseText;
					document.getElementById("output").innerHTML = output;
				}
			}
		}
	}
}
