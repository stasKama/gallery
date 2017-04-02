using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Xml;
using WebEWT.Models;

namespace WebEWT.Controllers
{
    public class ImageController : Controller
    {
        public ActionResult UploadImage()
        {
            return View();
        }

        public ActionResult AddImage(HttpPostedFileBase file)
        {
            var fileName = file.FileName;
            var path = getPathToImg(fileName);
            file.SaveAs(path);
            return RedirectToAction("Index", "Home");
        }

        private void renameImage()
        {
       
        }

        private string getPathToImg(string fileName)
        {
            var serverPath = Server.MapPath("~");
            return Path.Combine(serverPath, "Content", "img", fileName);
        }

        public JsonResult GetImages()
        {
            var serverPath = Server.MapPath("~");
            var pathToImageFolder = Path.Combine(serverPath, "Content", "img");
            var imageFiles = Directory.GetFiles(pathToImageFolder);
            var imges = imageFiles.Select(buildImage);
            return Json(imges, JsonRequestBehavior.AllowGet);
        }

        private Image buildImage(string path)
        {
            var fileName = Path.GetFileName(path);
            var image = new Image
            {
                Url = Url.Content("~/Content/img/" + fileName)
            };

            return image;
        }
    }
}