// ==========================================
// MediScript Notification System
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    const cards = document.querySelectorAll(".notification-card");
    const clearAllBtn = document.getElementById("clearAll");
    const markAllBtn = document.getElementById("markAllRead");
    const deleteReadBtn = document.getElementById("deleteRead");

    updateStatistics();

    // Loading Screen
    const loader = document.getElementById("loadingScreen");

    if(loader){

        loader.style.display="flex";

        setTimeout(()=>{
            loader.style.display="none";
        },800);

    }

    // ==========================
    // Clear All Notifications
    // ==========================

    if(clearAllBtn){

        clearAllBtn.addEventListener("click",()=>{

            if(confirm("Clear all notifications?")){

                document.getElementById("notificationList").innerHTML=`
                    <div class="notification-card">
                        <div class="notification-content">
                            <h3>No Notifications</h3>
                            <p>You're all caught up!</p>
                        </div>
                    </div>
                `;

                updateStatistics();

            }

        });

    }

    // ==========================
    // Mark All Read
    // ==========================

    if(markAllBtn){

        markAllBtn.addEventListener("click",()=>{

            document.querySelectorAll(".notification-card").forEach(card=>{

                card.classList.remove("unread");

                const badge=card.querySelector(".badge");

                if(badge){

                    badge.innerHTML="Read";
                    badge.className="badge success";

                }

            });

            updateStatistics();

        });

    }

    // ==========================
    // Delete Read Notifications
    // ==========================

    if(deleteReadBtn){

        deleteReadBtn.addEventListener("click",()=>{

            document.querySelectorAll(".notification-card").forEach(card=>{

                if(!card.classList.contains("unread")){

                    card.remove();

                }

            });

            updateStatistics();

        });

    }

    // ==========================
    // Click Notification
    // ==========================

    document.querySelectorAll(".notification-card").forEach(card=>{

        card.addEventListener("click",()=>{

            card.classList.remove("unread");

            const badge=card.querySelector(".badge");

            if(badge){

                badge.innerHTML="Read";
                badge.className="badge success";

            }

            updateStatistics();

        });

    });

});

// ==========================================
// Update Statistics
// ==========================================

function updateStatistics(){

    const total=document.querySelectorAll(".notification-card").length;

    const unread=document.querySelectorAll(".notification-card.unread").length;

    const read=total-unread;

    if(document.getElementById("totalNotifications"))
        document.getElementById("totalNotifications").textContent=total;

    if(document.getElementById("unreadNotifications"))
        document.getElementById("unreadNotifications").textContent=unread;

    if(document.getElementById("readNotifications"))
        document.getElementById("readNotifications").textContent=read;

    if(document.getElementById("todayNotifications"))
        document.getElementById("todayNotifications").textContent=Math.min(2,total);

}

// ==========================================
// Auto Refresh Time
// ==========================================

setInterval(()=>{

    const small=document.querySelectorAll(".notification-content small");

    small.forEach(item=>{

        item.style.opacity=".8";

        setTimeout(()=>{

            item.style.opacity="1";

        },500);

    });

},10000);

console.log("✅ MediScript Notifications Loaded");